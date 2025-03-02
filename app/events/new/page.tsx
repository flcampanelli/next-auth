"use client";

import { Icons } from "@/components/icons";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { eventSchema } from "@/lib/validation/event-schema";
import { LucideCircleX } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

interface IEvent {
  title: string;
  logo?: string;
  date: Date | undefined;
  placeName?: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
  };
  description?: string;
  banner?: string;
  price: number | null;
}

export default function NewEvent() {
  const { toast } = useToast();

  const router = useRouter();

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [data, setData] = useState<IEvent>({
    title: "",
    logo: "",
    date: undefined,
    placeName: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
    },
    description: "",
    banner: "",
    price: null,
  });

  async function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const validatedData = eventSchema.parse(data);

      let updatedData = { ...validatedData };

      if (logoFile) {
        const logoUrl = await uploadImage(logoFile, "logo");
        if (logoUrl) updatedData = { ...updatedData, logo: logoUrl };
      }
      if (bannerFile) {
        const bannerUrl = await uploadImage(bannerFile, "banner");
        if (bannerUrl) updatedData = { ...updatedData, banner: bannerUrl };
      }

      const request = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const response = await request.json();

      if (!request.ok) {
        toast({
          title: "Oops...",
          description: response.error,
          variant: "destructive",
        });
      } else {
        router.push("/");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Oops...",
          description: error.issues[0].message,
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    if (name in data.address) {
      setData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  function handleDateChange(e: { name: string; value: any }) {
    setData((prev) => ({
      ...prev,
      [e.name]: e.value,
    }));
  }

  async function uploadImage(
    file: File,
    field: "logo" | "banner"
  ): Promise<string | undefined> {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `events/${field}/${fileName}`;

    try {
      const { data, error } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (error) throw error;

      const { data: publicData } = supabase.storage
        .from("images")
        .getPublicUrl(filePath);

      if (!publicData?.publicUrl) {
        toast({
          title: "Oops...",
          description: "Falha ao obter URL",
          variant: "destructive",
        });
        return;
      }

      const publicUrl = publicData.publicUrl;
      return publicUrl;
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Oops...",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Oops...",
          description: "Erro desconhecido: " + error,
          variant: "destructive",
        });
      }
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { files, name } = e.target;
    if (files?.[0]) {
      const file = files[0];
      const previewUrl = URL.createObjectURL(file);

      if (name === "logo") {
        setLogoFile(file);
        setLogoPreview(previewUrl);
      } else {
        setBannerFile(file);
        setBannerPreview(previewUrl);
      }
    }
  }

  function handleRemoveFile(name: string) {
    const input = document.getElementById(name) as HTMLInputElement | null;

    if (name === "logo") {
      setLogoFile(null);
      setLogoPreview(null);
      if (input) input.value = "";
    } else {
      setBannerFile(null);
      setBannerPreview(null);
      if (input) input.value = "";
    }
  }

  return (
    <div className="m-10 mx-auto px-4 sm:max-w-[40rem] md:max-w-[48rem] lg:max-w-[64rem] xl:max-w-[80rem]">
      <form
        onSubmit={onSubmit}
        className="space-y-8 w-full md:w-3/4 lg:w-3/5 xl:w-1/2"
      >
        <div className="space-y-2">
          <Label htmlFor="email">
            Título do Evento <span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            type="text"
            autoCapitalize="words"
            autoCorrect="off"
            disabled={isLoading}
            name="title"
            value={data.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex items-center">
          <div className="relative">
            {logoPreview && (
              <button
                type="button"
                className="absolute z-10 right-3 bg-white text-red-500 rounded-full"
                onClick={() => handleRemoveFile("logo")}
              >
                <LucideCircleX />
              </button>
            )}

            <Avatar className="h-20 w-20 mr-4">
              <AvatarImage
                src={logoPreview || "https://placehold.co/200x200?text=Logo"}
                alt="event logo"
                className="select-none object-cover"
              />
            </Avatar>
          </div>
          <div className="w-96 space-y-2">
            <Label htmlFor="email">Logo</Label>
            <Input
              id="logo"
              type="file"
              accept="image/*"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              name="logo"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <div className="w-72 space-y-2">
          <Label>
            Data do Evento <span className="text-red-500">*</span>
          </Label>
          <DateTimePicker
            granularity="minute"
            disabled={isLoading}
            value={data.date || undefined}
            onChange={(value) =>
              handleDateChange({ name: "date", value: value || null })
            }
            placeholder="Selecione uma data"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Nome do Local</Label>
          <Input
            id="placeName"
            type="text"
            autoCapitalize="words"
            autoCorrect="off"
            disabled={isLoading}
            name="placeName"
            value={data.placeName}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">
            Endereço <span className="text-red-500">*</span>
          </Label>
          <Input
            id="street"
            type="text"
            autoCapitalize="words"
            autoCorrect="off"
            disabled={isLoading}
            name="street"
            value={data.address.street}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">
              Cidade <span className="text-red-500">*</span>
            </Label>
            <Input
              id="city"
              type="text"
              autoCapitalize="words"
              autoCorrect="off"
              disabled={isLoading}
              name="city"
              value={data.address.city}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">
              Estado <span className="text-red-500">*</span>
            </Label>
            <Input
              id="state"
              type="text"
              autoCapitalize="words"
              autoCorrect="off"
              disabled={isLoading}
              name="state"
              value={data.address.state}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">
              Cep <span className="text-red-500">*</span>
            </Label>
            <Input
              id="postalCode"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              name="postalCode"
              value={data.address.postalCode}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Descrição do Evento</Label>
          <Textarea
            id="description"
            name="description"
            autoCapitalize="sentences"
            autoCorrect="off"
            disabled={isLoading}
            value={data.description}
            onChange={handleInputChange}
            rows={6}
          />
        </div>
        <div className="space-y-2">
          <div>
            <Label htmlFor="email">Banner</Label>
            <Input
              id="banner"
              type="file"
              accept="image/*"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              name="banner"
              onChange={handleFileChange}
            />
          </div>
          <div className="relative w-full h-64">
            {bannerPreview && (
              <button
                type="button"
                className="absolute z-10 -top-2 -right-2 bg-white text-red-500 rounded-full"
                onClick={() => handleRemoveFile("banner")}
              >
                <LucideCircleX />
              </button>
            )}

            <Image
              src={
                bannerPreview ||
                "https://placehold.co/400x400?text=Event%20Banner"
              }
              alt="event banner"
              className="rounded-lg"
              objectFit="cover"
              fill
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">
            Preço do Ingresso <span className="text-red-500">*</span>
          </Label>
          <Input
            id="price"
            type="number"
            autoCapitalize="none"
            autoCorrect="off"
            disabled={isLoading}
            name="price"
            value={data.price === null ? "" : data.price}
            onChange={handleInputChange}
          />
        </div>
        <Button className="w-1/3 md:w-1/4" disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Criar Evento
        </Button>
      </form>
    </div>
  );
}

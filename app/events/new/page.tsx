"use client";

import { Icons } from "@/components/Common/Icons";
import { Button } from "@/components/ui/button";
import { Combobox, ComboboxOption } from "@/components/ui/combobox";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/useToast";
import { supabase } from "@/lib/supabase";
import { eventSchema } from "@/lib/validation/event-schema";
import { LucideCircleX } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";

interface IEvent {
  title: string;
  organizationId: string | undefined;
  date: Date | undefined;
  description?: string;
  banner?: string;
  price: number | null;
}

export default function NewEvent() {
  const { toast } = useToast();
  const router = useRouter();

  const [organizations, setOrganizations] = useState<ComboboxOption[]>([]);
  const [selectedOrganization, setSelectedOrganization] = useState<
    ComboboxOption | undefined
  >(undefined);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [data, setData] = useState<IEvent>({
    title: "",
    organizationId: "",
    date: undefined,
    description: "",
    banner: "",
    price: null,
  });

  useEffect(() => {
    async function fetchOrganizations() {
      try {
        const response = await fetch("/api/organizers");
        if (!response.ok) {
          throw new Error("Failed to fetch organizations");
        }
        const data = await response.json();
        const organizers = data.map(
          (org: { id: string; name: string; logo: string }) => ({
            id: org.id,
            value: org.name.toLocaleLowerCase(),
            label: org.name,
            imageUrl: org.logo,
          })
        );
        setOrganizations(organizers);
      } catch (error) {
        toast({
          title: "Oops...",
          description: "Falha ao carregar organizações",
          variant: "destructive",
        });
      }
    }

    fetchOrganizations();
  }, [toast]);

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      organizationId: selectedOrganization?.id || undefined,
    }));
  }, [selectedOrganization]);

  async function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const validatedData = eventSchema.parse(data);

      let updatedData = { ...validatedData };

      if (bannerFile) {
        const bannerUrl = await uploadImage(bannerFile, "banner");
        if (bannerUrl) updatedData = { ...updatedData, banner: bannerUrl };
      }

      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const result = await response.json();

      if (!response.ok) {
        toast({
          title: "Oops...",
          description: result.error,
          variant: "destructive",
        });
      } else {
        sessionStorage.setItem("newEventCreated", "true");
        router.push(`/events/${result.id}`);
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

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

      setBannerFile(file);
      setBannerPreview(previewUrl);
    }
  }

  function handleRemoveFile(name: string) {
    const input = document.getElementById(name) as HTMLInputElement | null;

    setBannerFile(null);
    setBannerPreview(null);
    if (input) input.value = "";
  }

  return (
    <div className="m-10 mx-auto px-4 sm:max-w-[40rem] md:max-w-[48rem] lg:max-w-[64rem] xl:max-w-[80rem]">
      <form
        onSubmit={onSubmit}
        className="space-y-8 w-full md:w-3/4 lg:w-3/5 xl:w-1/2"
      >
        <div className="space-y-2">
          <Label htmlFor="title">
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
        <div className="space-y-3 flex flex-col">
          <Label>
            Organização <span className="text-red-500">*</span>
          </Label>
          <Combobox
            options={organizations}
            onSelect={setSelectedOrganization}
            placeholder="Selecione uma organização"
            emptyMessage="Nenhuma organização encontrada."
            searchPlaceholder="Selecione uma organização"
            className="w-[300px]"
          />
        </div>
        <div className="w-72 space-y-2">
          <Label>
            Data do Evento <span className="text-red-500">*</span>
          </Label>
          <DateTimePicker
            date={data.date || undefined}
            setDate={(value) =>
              handleDateChange({ name: "date", value: value || null })
            }
            placeholder="Selecione uma data"
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Descrição do Evento</Label>
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
            <Label htmlFor="banner">Banner</Label>
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
                disabled={isLoading}
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
          <Label htmlFor="price">
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

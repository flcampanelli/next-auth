"use client";

import { Icons } from "@/components/Common/Icons";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/useToast";
import { supabase } from "@/lib/supabase";
import { LucideCircleX } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewOrganizer() {
  const { toast } = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const [organization, setOrganization] = useState({
    name: "",
    logo: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
    },
    contactEmail: "",
    socialLinks: {
      facebook: "",
      instagram: "",
      twitter: "",
      linkedin: "",
    },
  });

  async function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      let data = { ...organization };

      if (logoFile) {
        const logoUrl = await uploadImage(logoFile);
        if (logoUrl) data = { ...organization, logo: logoUrl };
      }

      const response = await fetch("/api/organizers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        toast({
          title: "Oops...",
          description: result.error,
          variant: "destructive",
        });
      } else {
        router.push("/events/new");
      }
    } catch (error) {
      toast({
        title: "Oops...",
        description: String(error),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function uploadImage(file: File): Promise<string | undefined> {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `events/logo/${fileName}`;

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

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    if (name in organization.address) {
      setOrganization((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else if (name in organization.socialLinks) {
      setOrganization((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [name]: value,
        },
      }));
    } else {
      setOrganization((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { files } = e.target;
    if (files?.[0]) {
      const file = files[0];
      const previewUrl = URL.createObjectURL(file);

      setLogoFile(file);
      setLogoPreview(previewUrl);
    }
  }

  function handleRemoveFile(name: string) {
    const input = document.getElementById(name) as HTMLInputElement | null;

    setLogoFile(null);
    setLogoPreview(null);
    if (input) input.value = "";
  }

  return (
    <div className="m-10 mx-auto px-4 sm:max-w-[40rem] md:max-w-[48rem] lg:max-w-[64rem] xl:max-w-[80rem]">
      <form
        onSubmit={onSubmit}
        className="space-y-8 w-full md:w-3/4 lg:w-3/5 xl:w-1/2"
      >
        <div className="space-y-2">
          <Label htmlFor="name">
            Nome da Organização <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            type="text"
            autoCapitalize="words"
            autoCorrect="off"
            disabled={isLoading}
            name="name"
            value={organization.name}
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
                disabled={isLoading}
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
            <Label htmlFor="logo">Logo</Label>
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

        {/* w-2/3 */}
        <div className="space-y-2 w-2/3">
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
            value={organization.address.street}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">
              Cidade <span className="text-red-500">*</span>
            </Label>
            <Input
              id="city"
              type="text"
              autoCapitalize="words"
              autoCorrect="off"
              disabled={isLoading}
              name="city"
              value={organization.address.city}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">
              Estado <span className="text-red-500">*</span>
            </Label>
            <Input
              id="state"
              type="text"
              autoCapitalize="words"
              autoCorrect="off"
              disabled={isLoading}
              name="state"
              value={organization.address.state}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="postalCode">
              Cep <span className="text-red-500">*</span>
            </Label>
            <Input
              id="postalCode"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              name="postalCode"
              value={organization.address.postalCode}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="space-y-2 w-2/3">
          <Label htmlFor="contactEmail">
            Email de Contato <span className="text-red-500">*</span>
          </Label>
          <Input
            id="contactEmail"
            type="email"
            autoCapitalize="words"
            autoCorrect="off"
            disabled={isLoading}
            name="contactEmail"
            value={organization.contactEmail}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2 w-2/3">
          <Label htmlFor="facebook">Facebook</Label>
          <Input
            id="facebook"
            type="text"
            autoCapitalize="words"
            autoCorrect="off"
            disabled={isLoading}
            name="facebook"
            value={organization.socialLinks.facebook}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2 w-2/3">
          <Label htmlFor="instagram">Instagram</Label>
          <Input
            id="instagram"
            type="text"
            autoCapitalize="words"
            autoCorrect="off"
            disabled={isLoading}
            name="instagram"
            value={organization.socialLinks.instagram}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2 w-2/3">
          <Label htmlFor="twitter" className="flex">
            Twitter
          </Label>
          <Input
            id="twitter"
            type="text"
            autoCapitalize="words"
            autoCorrect="off"
            disabled={isLoading}
            name="twitter"
            value={organization.socialLinks.twitter}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2 w-2/3">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            type="text"
            autoCapitalize="words"
            autoCorrect="off"
            disabled={isLoading}
            name="linkedin"
            value={organization.socialLinks.linkedin}
            onChange={handleInputChange}
          />
        </div>
        <Button className="w-1/2 md:w-1/3" disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Criar Organização
        </Button>
      </form>
    </div>
  );
}

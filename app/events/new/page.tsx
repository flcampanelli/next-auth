"use client";

import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

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

  return (
    <div className="m-10 mx-auto px-4 sm:max-w-[40rem] md:max-w-[48rem] lg:max-w-[64rem] xl:max-w-[80rem]">
      <form
        onSubmit={() => {}}
        className="space-y-8 w-full md:w-3/4 lg:w-3/5 xl:w-1/2"
      >
        <div className="space-y-2">
          <Label htmlFor="email">Título do Evento</Label>
          <Input
            id="title"
            type="text"
            autoCapitalize="words"
            autoCorrect="off"
            name="title"
            value={data.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Link do logo</Label>
          <Input
            id="logo"
            type="text"
            autoCapitalize="none"
            autoCorrect="off"
            name="logo"
            value={data.logo}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-72 space-y-2">
          <Label>Data</Label>
          <DateTimePicker
            granularity="minute"
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
            name="placeName"
            value={data.placeName}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Endereço</Label>
          <Input
            id="street"
            type="text"
            autoCapitalize="words"
            autoCorrect="off"
            name="street"
            value={data.address.street}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Cidade</Label>
            <Input
              id="city"
              type="text"
              autoCapitalize="words"
              autoCorrect="off"
              name="city"
              value={data.address.city}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Estado</Label>
            <Input
              id="state"
              type="text"
              autoCapitalize="words"
              autoCorrect="off"
              name="state"
              value={data.address.state}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Cep</Label>
            <Input
              id="postalCode"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              name="postalCode"
              value={data.address.postalCode}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Descrição do evento</Label>
          <Textarea
            id="description"
            name="description"
            autoCapitalize="sentences"
            autoCorrect="off"
            value={data.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Link do Banner</Label>
          <Input
            id="banner"
            type="text"
            autoCapitalize="none"
            autoCorrect="off"
            name="banner"
            value={data.banner}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Preço do ingresso</Label>
          <Input
            id="price"
            type="number"
            autoCapitalize="none"
            autoCorrect="off"
            name="price"
            value={data.price === null ? "" : data.price}
            onChange={handleInputChange}
          />
        </div>
        <Button className="w-1/4 md:w-1/5">Criar Evento</Button>
      </form>
    </div>
  );
}

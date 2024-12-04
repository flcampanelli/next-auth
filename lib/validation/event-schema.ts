import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  logo: z.string().optional(),
  date: z.coerce.date({ required_error: "Data é obrigatória" }),
  placeName: z.string().optional(),
  address: z.object({
    street: z.string().min(1, "Rua é obrigatória"),
    city: z.string().min(1, "Cidade é obrigatória"),
    state: z.string().min(1, "Estado é obrigatório"),
    postalCode: z.string().min(8, "CEP é obrigatório"),
  }),
  description: z.string().optional(),
  banner: z.string().optional(),
  price: z.coerce.number().positive("Preço deve ser maior que zero"),
});

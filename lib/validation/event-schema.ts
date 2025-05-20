import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  organizationId: z.string({ required_error: "Organização é obrigatória" }),
  date: z.coerce.date({ required_error: "Data é obrigatória" }),
  description: z.string().optional(),
  banner: z.string().optional(),
  price: z.coerce.number().positive("Preço deve ser maior que zero"),
});

import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return format(date, "eeee, dd 'de' MMMM", { locale: ptBR }).replace(
    /^\w/,
    (c) => c.toUpperCase()
  );
}

export function formatHour(date: string) {
  return format(new Date(date), "HH:mm");
}

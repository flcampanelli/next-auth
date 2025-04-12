import { headers } from "next/headers";

export function getBaseUrl(): string {
  const host = headers().get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  if (!host) throw new Error("Host header is missing");

  return `${protocol}://${host}`;
}

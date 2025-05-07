export function getBaseUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) throw new Error("Host header is missing");

  return baseUrl;
}

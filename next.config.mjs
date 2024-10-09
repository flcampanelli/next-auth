/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    domains: ["fakestoreapi.com", "placehold.co"],
  },
};

export default nextConfig;

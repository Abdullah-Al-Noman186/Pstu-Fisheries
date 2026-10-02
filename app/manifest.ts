import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PSTU Fisheries Alumni",
    short_name: "PSTU Alumni",
    description: "Connect with the Faculty of Fisheries community at PSTU.",
    start_url: "/",
    display: "standalone",
    background_color: "#F0FAFC",
    theme_color: "#087EA4",
    icons: [{ src: "/logo.png", sizes: "any", type: "image/png", purpose: "any" }],
  };
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
      "via.placeholder.com",
    ],
  },
  // Force Node.js to use Google DNS
  serverExternalPackages: ["mongoose"],
};

module.exports = nextConfig;
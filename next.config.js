/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  optimizeFonts: false,

  webpack(config) {
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  },
  images: {
    domains: [
      "i.pinimg.com",
      "image.tmdb.org",
      "imagesvc.meredithcorp.io",
      "static.vecteezy.com",
    ],
  },
};

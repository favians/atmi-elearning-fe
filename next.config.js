const withTM = require("next-transpile-modules")(["pdfjs-dist"]);

/** @type {import('next').NextConfig} */
const nextConfig = withTM({
  reactStrictMode: true,

  webpack(config) {
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });

    return config;
  },
});

module.exports = nextConfig;

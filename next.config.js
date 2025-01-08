const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
  // output: "export",
  // reactStrictMode: false,
  images: {
    loader: "custom",
    loaderFile: "./my-loader.ts",
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  env: {},
  trailingSlash: true,
};
module.exports = withNextIntl(nextConfig);

// module.exports = nextConfig;

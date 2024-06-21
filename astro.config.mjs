import { defineConfig } from 'astro/config';
import { astroImageTools } from "astro-imagetools";

import preact from "@astrojs/preact";

const BASE_URL =
  process.env.NODE_ENV === "production" ? "../../" : "/";

// https://astro.build/config
export default defineConfig({
  integrations: [preact(), astroImageTools],
  buildOptions: {
    site: {
      baseUrl: BASE_URL,
    },
  },

});
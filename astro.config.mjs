import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import sanity from "@sanity/astro";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [
    mdx(),
    sitemap(),
    sanity({
      projectId: '06loossa',
      dataset: 'production',
      useCdn: false,
      studioBasePath: '/admin'
    }),
    react()
  ]
});
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import sanity from "@sanity/astro";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://coreyrowe.me',
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
  ],
  redirects: {
    '/blog': '/',
    '/2023/09/03/milegtransit-directory': '/2023/01/25/milegtransit-directory'
  }
});
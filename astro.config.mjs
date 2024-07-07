import { defineConfig } from 'astro/config';
import { loadEnv } from "vite";
import netlify from '@astrojs/netlify';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import sanity from "@sanity/astro";
import react from "@astrojs/react";

const {
    PUBLIC_SANITY_PROJECT_ID,
    PUBLIC_SANITY_DATASET,
    SANITY_API_TOKEN
} = loadEnv(import.meta.env.MODE, process.cwd(), '');

// https://astro.build/config
export default defineConfig({
    output: 'hybrid',
    site: 'https://coreyrowe.me',
    adapter: netlify({
        imageCDN: false
    }),
    integrations: [
        mdx(),
        sitemap(),
        sanity({
            projectId: PUBLIC_SANITY_PROJECT_ID,
            dataset: PUBLIC_SANITY_DATASET,
            token: SANITY_API_TOKEN,
            apiVersion: 'v2022-03-07',
            useCdn: false,
            studioBasePath: '/admin',
            perspective: 'published'
        }),
        react()
    ],
    image: {
        domains: [
            'cdn.sanity.io'
        ]
    },
    vite: {
        css: {
            transformer: 'lightningcss'
        },
        ssr: {
            noExternal: [
                'react-tweet'
            ]
        }
    },
    redirects: {
        '/blog': '/',
        '/2023/09/03/milegtransit-directory': '/2023/01/25/milegtransit-directory'
    }
});
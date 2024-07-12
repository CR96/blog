import { defineConfig } from 'astro/config';
import { loadEnv } from "vite";
import vercel from '@astrojs/vercel/serverless';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import sanity from "@sanity/astro";
import react from "@astrojs/react";

const {
    SANITY_STUDIO_PROJECT_ID,
    SANITY_STUDIO_DATASET,
    SANITY_API_TOKEN
} = loadEnv(import.meta.env.MODE, process.cwd(), '');

// https://astro.build/config
export default defineConfig({
    output: 'hybrid',
    site: 'https://coreyrowe.me',
    adapter: vercel({
        imageService: true,
        imagesConfig: {
            domains: [
                'cdn.sanity.io'
            ],
            sizes: [
                540, 760, 1080, 1520
            ],
            formats: [
                'image/avif', 'image/webp'
            ]
        }
    }),
    integrations: [
        mdx(),
        sitemap(),
        sanity({
            projectId: SANITY_STUDIO_PROJECT_ID,
            dataset: SANITY_STUDIO_DATASET,
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
        envPrefix: [
            'SANITY_STUDIO_'
        ],
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
        '/2023/09/03/milegtransit-vol1': '/topic/milegtransit',
        '/2024/01/10/milegtransit-vol2': '/topic/milegtransit'
    }
});
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
        '/2023/09/03/milegtransit-vol1': '/topics/legislative-updates',
        '/2024/01/10/milegtransit-vol2': '/topics/legislative-updates',
        '/2023/09/03/milegtransit-directory': '/topics/legislative-updates/directory',
        '/milegtransit-directory': '/topics/legislative-updates/directory',
        '/2023/09/03/milegtransit-week1': '/2023/01/19/milegtransit-week1',
        '/2023/09/03/milegtransit-week3': '/2023/01/26/milegtransit-week3',
        '/2023/09/03/milegtransit-week4': '/2023/02/02/milegtransit-week4',
        '/2023/09/03/milegtransit-week5': '/2023/02/09/milegtransit-week5',
        '/2023/09/03/milegtransit-week7': '/2023/02/23/milegtransit-week7',
        '/2023/09/03/milegtransit-week8': '/2023/03/02/milegtransit-week8',
        '/2023/09/03/milegtransit-week9': '/2023/03/16/milegtransit-week10',
        '/2023/09/03/milegtransit-week12': '/2023/04/13/milegtransit-week12',
        '/2023/09/03/milegtransit-week14': '/2023/04/27/milegtransit-week14',
        '/2023/09/03/milegtransit-week15': '/2023/05/04/milegtransit-week15',
        '/2023/09/03/milegtransit-week16': '/2023/05/11/milegtransit-week16',
        '/2023/09/03/milegtransit-week17': '/2023/05/18/milegtransit-week17',
        '/2023/09/03/milegtransit-week18': '/2023/06/28/milegtransit-week18',
    }
});
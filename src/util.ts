import { sanityClient } from "sanity:client";
import groq from "groq";
import type { SanityReference } from "@sanity/client";

export const generateDatedPostSlug = (datePublished: string, baseSlug: string) => {
    const date = new Date(datePublished);
    const dateFormatted = date.toISOString().split('T')[0].replaceAll('-', '/');
    return `${dateFormatted}/${baseSlug}`;
};

export const resolveSanityRef = <T>(ref: SanityReference) => {
    const resolveRefQuery = groq`
        *[_id == $id][0]
    `;
    return sanityClient.fetch<T>(resolveRefQuery, { id: ref._ref });
};
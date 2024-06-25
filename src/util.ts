import { sanityClient } from "sanity:client";
import groq from "groq";
import type { SanityReference } from "@sanity/client";
import { randomUUID } from 'crypto';

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

export const uniqueId = (prefix: string) => {
    const uuid = randomUUID().slice(0, 5);
    return `${prefix}-${uuid}`;
};
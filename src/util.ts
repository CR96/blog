import { urlSearchParamPreviewSecret } from '@sanity/preview-url-secret';

export const generateDatedPostSlug = (datePublished: string, baseSlug: string) => {
    const date = new Date(datePublished);
    const dateFormatted = date.toISOString().split('T')[0].replaceAll('-', '/');
    return `${dateFormatted}/${baseSlug}`;
};

export const fakeSanityPreviewUrl = (origin: string, secret: string) => {
    const searchParams = new URLSearchParams();
    searchParams.append(urlSearchParamPreviewSecret, secret);
    const requestUrl = new URL(origin);
    requestUrl.search = searchParams.toString();
    return requestUrl.toString();
};

export const uniqueId = (prefix: string) => {
    const uuid = crypto.randomUUID().slice(0, 5);
    return `${prefix}-${uuid}`;
};
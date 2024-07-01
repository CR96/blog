import groq from 'groq';
import { sanityClient } from 'sanity:client';
import { validatePreviewUrl } from '@sanity/preview-url-secret';
import type { APIRoute } from 'astro';
import type { Post } from '../../groq';
import { fakeSanityPreviewUrl, generateDatedPostSlug } from '../../util';

export const prerender = false;

export const GET: APIRoute = async (context) => {
    const { id, secret, disable = false } = Object.fromEntries(
        context.url.searchParams.entries()
    );
    
    if (disable !== false) {
        context.cookies.delete('previewSecret', {
            path: '/'
        });

        const referer = context.request.headers.get('Referer');
        if (referer && referer != 'about:client') {
            const redirect = referer.replace('/preview', '');
            return context.redirect(redirect);
        } else {
            return new Response('Preview mode disabled');
        }
    }

    if (!id || !secret) {
        return new Response("HTTP 400", { status: 400 });
    }

    const { isValid } = await validatePreviewUrl(
        sanityClient,
        fakeSanityPreviewUrl(context.url.origin, secret)
    );
    if (!isValid) {
        return new Response("HTTP 401", { status: 401 });
    }

    const previewEnableQuery = groq`
        *[_type == "post" && _id == $id][0]
    `;
    const post = await sanityClient.fetch<Post>(previewEnableQuery, {
        id
    }, {
        perspective: 'previewDrafts'
    });
    if (!post) {
        return new Response('HTTP 404', { status: 404 });
    }

    const datedSlug = generateDatedPostSlug(post.datePublished, post.slug.current);

    context.cookies.set('previewSecret', secret, {
        path: '/',
        maxAge: 60 * 60
    });
    return context.redirect(`/${datedSlug}/preview`);
};
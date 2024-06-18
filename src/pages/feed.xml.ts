import rss from '@astrojs/rss';
import groq from 'groq';
import { sanityClient } from "sanity:client";
import type { APIRoute } from "astro";
import type { Post } from '../groq';
import { generateDatedPostSlug } from "../util";
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export const GET: APIRoute = async (context) => {
	const rssFeedQuery = groq`
		*[_type == "post"]
	`;
    const posts = await sanityClient.fetch<Post[]>(rssFeedQuery);

	if (!context.site) {
		return new Response();
	}

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map(post => {
			const datedSlug = generateDatedPostSlug(post.datePublished, post.slug.current);
			return {
				title: post.title,
				description: post.description,
				pubDate: new Date(post.datePublished),
				link: `/blog/${datedSlug}`,
			}
		}),
		stylesheet: '/feed-style.xsl'
	});
}

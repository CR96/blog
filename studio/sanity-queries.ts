import groq from "groq";
import type { PostPageQueryResult } from "./sanity-typegen";
import type { Props as PortableTextProps, Mark } from 'astro-portabletext/types';

const contentBlockSubquery = `
    _type == "image" => {
        ...,
        asset->
    },
    _type == "video" => {
        ...,
        video {
            ...,
            asset->
        }
    },
    markDefs[] {
        ...,
        _type == "subject" => {
            ...,
            subject->
        }
    }
`;

const postPageQueryValues = `
    {
        ...,
        content[] {
            ...,
            ${ contentBlockSubquery },
            _type == "opinion" => {
                ...,
                ${ contentBlockSubquery }
            }
        },
        topic->,
        thumbnail {
            ...,
            asset->
        }
    }
`;

export const postPageQuery = groq`
    *[_type == "post"]${
        postPageQueryValues
    }
`;

export const previewPostPageQuery = groq`
    *[
        _type == "post" &&
        datePublished == $datePublished &&
        slug.current == $slug
    ]${
        postPageQueryValues
    }[0]
`;

export type DereferencedPost =
    PostPageQueryResult[number];

export type DereferencedContentBlock<T> =
    PortableTextProps<
        Extract<
            DereferencedPost['content'][number],
            { '_type': T }
        >
    >;

export type DereferencedContentMark<T> =
    PortableTextProps<
        Mark<
            Extract<
                NonNullable<
                    DereferencedPost['content'][number]['markDefs']
                >[number],
                { '_type': T }
            >
        >
    >;

export const subjectPageQuery = groq`
    *[_type == "subject"]{
        ...,
        "posts": *[_type == "post" && references(^._id)] | order(datePublished desc)
    }
`;

export const subjectIndexQuery = groq`
    *[_type == "subject"] | order(name)
`;

export const topicPageQuery = groq`
    *[_type == "topic"]{
        ...,
        "posts": *[_type == "post" && references(^._id)] | order(datePublished desc)
    }
`;

export const rssFeedQuery = groq`
    *[_type == "post"]
`;

export const headerQuery = groq`
    *[_type == "topic"] | order(orderRank)
`;

export const featuredPostsQuery = groq`
    *[_type == "post" && featured == true] | order(datePublished desc)
`;

export const postPreviewQuery = groq`
    *[_type == "post" && _id == $id][0]
`;
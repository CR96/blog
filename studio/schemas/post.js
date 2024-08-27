import alt from '@studio/fields/alt';
import caption from '@studio/fields/caption';
import content from '@studio/fields/content';
import groq from 'groq';
import { BulbOutlineIcon } from '@sanity/icons';
import { toPlainText } from '@portabletext/toolkit';

export default {
    name: "post",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
            validation: rule => rule.required()
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                isUnique: async (slug, context) => {
                    const { document, getClient } = context;
                    const client = getClient({ apiVersion: 'v2022-03-07' });
                    const id = document._id.replace('drafts.', '');

                    const uniqueSlugQuery = groq`
                        !defined(
                            *[
                                _type == "post" &&
                                !(_id in [ $id, "drafts." + $id ]) &&
                                slug.current == $slug &&
                                datePublished == $datePublished
                            ][0]
                        )
                    `;
                    return await client.fetch(uniqueSlugQuery, {
                        id,
                        slug,
                        datePublished: document.datePublished
                    }, {
                        perspective: 'raw'
                    });
                }
            },
            validation: rule => rule.required()
        },
        {
            name: "description",
            title: "Description",
            type: "string",
            description: "Used as metadata for social media preview cards"
        },
        {
            name: "datePublished",
            title: "Date",
            type: "date",
            validation: rule => rule.required()
        },
        {
            name: "topic",
            title: "Topic",
            type: "reference",
            to: [ { type: "topic" } ],
            validation: rule => rule.required()
        },
        {
            name: "featured",
            title: "Featured",
            type: "boolean",
            initialValue: false
        },
        {
            name: "thumbnail",
            title: "Thumbnail",
            type: "image",
            fields: [
                alt,
                caption
            ]
        },
        {
            ...content,
            of: [
                ...content.of,
                {
                    name: "opinion",
                    title: "Opinion",
                    type: "object",
                    fields: [
                        content
                    ],
                    icon: BulbOutlineIcon,
                    preview: {
                        select: {
                            content: "content"
                        },
                        prepare: ({ content }) => {
                            return {
                                title: "Opinion",
                                subtitle: content ? toPlainText(content) : false
                            };
                        }
                    }
                }
            ]
        }
    ]
}
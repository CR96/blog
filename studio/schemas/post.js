import alt from '../fields/alt';
import caption from '../fields/caption';
import content from '../fields/content';
import { BulbOutlineIcon } from '@sanity/icons';
import { toPlainText } from 'astro-portabletext/utils';

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
        source: "title"
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
      to: [{ type: "topic" }],
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
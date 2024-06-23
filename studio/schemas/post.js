import block from '../fields/block';
import alt from '../fields/alt';
import caption from '../fields/caption';
import { ImageIcon, PresentationIcon, TwitterIcon } from "@sanity/icons";

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
        alt
      ]
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [
        block,
        {
          type: "image",
          fields: [
            alt,
            caption
          ],
          icon: ImageIcon
        },
        {
          name: 'video',
          title: 'Video',
          type: 'object',
          icon: PresentationIcon,
          fields: [
            {
              name: 'video',
              type: 'mux.video',
              title: 'Video',
              validation: rule => rule.required()
            },
            caption
          ]
        },
        {
          name: "tweet",
          type: "object",
          fields: [
            {
              name: "id",
              type: "string",
              title: "Tweet ID",
              validation: rule => rule.required()
            },
            caption
          ],
          icon: TwitterIcon,
        }
      ],
      validation: rule => rule.required()
    }
  ]
}
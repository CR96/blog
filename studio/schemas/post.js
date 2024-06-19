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
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt text"
        }
      ]
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block"
        },
        {
          type: "image",
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt text",
              description: "Leave blank for decorative images"
            }
          ],
          icon: ImageIcon
        },
        {
          title: 'Video',
          type: 'mux.video',
          icon: PresentationIcon
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
            }
          ],
          icon: TwitterIcon,
        }
      ],
      validation: rule => rule.required()
    }
  ]
}
import block from '../fields/block';
import alt from '../fields/alt';
import caption from '../fields/caption';
import { BookIcon, ImageIcon, PresentationIcon, ThListIcon, TwitterIcon } from "@sanity/icons";

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
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          ...block,
          styles: [
            ...block.styles,
            { title: 'Opinion', value: 'opinion' }
          ],
          marks: {
            annotations: [
              {
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  {
                    name: "href",
                    title: "Link",
                    description: "A valid web, email, phone, or relative link.",
                    type: "url",
                    validation: rule => rule.required()
                  }
                ]
              },
              {
                name: "subject",
                title: "Subject",
                type: "object",
                icon: BookIcon,
                fields: [
                  {
                    name: "subject",
                    title: "Subject",
                    type: "reference",
                    to: [
                      { type: "subject" }
                    ],
                    validation: rule => rule.required()
                  }
                ]
              }
            ]
          }
        },
        {
          name: "image",
          title: "Image",
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
          title: "Tweet",
          type: "object",
          fields: [
            {
              name: "id",
              title: "Tweet ID",
              type: "string",
              validation: rule => rule.required()
            },
            caption
          ],
          icon: TwitterIcon,
        },
        {
          name: "table",
          title: "Table",
          type: "object",
          fields: [
            {
              name: "table",
              title: "Table Body",
              type: "table",
              validation: rule => rule.required()
            },
            {
              name: "numHeader",
              title: "Table Header",
              description: "Number of rows that represent the table header",
              type: "number",
              initialValue: 0,
              validation: rule => rule.required().min(0)
            }
          ],
          icon: ThListIcon
        }
      ],
      validation: rule => rule.required()
    }
  ]
}
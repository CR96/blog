import alt from '../fields/alt';
import caption from '../fields/caption';
import block from '../fields/block';
import { BookIcon, ImageIcon, PresentationIcon, ThListIcon, TwitterIcon } from "@sanity/icons";

export default {
  name: "content",
  title: "Content",
  type: "array",
  of: [
    {
      ...block,
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
                validation: rule => rule.uri({
                  allowRelative: true
                }).required()
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
      icon: ImageIcon,
      preview: {
        select: {
          alt: 'alt'
        },
        prepare: ({ alt }) => {
          return {
            title: 'Image',
            subtitle: alt
          };
        }
      }
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
      ],
      preview: {
        select: {
          assetId: 'video.asset.assetId'
        },
        prepare: ({ assetId }) => {
          return {
            title: 'Video',
            subtitle: assetId ? `Asset #${ assetId }` : false
          };
        }
      }
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
      preview: {
        select: {
          id: "id"
        },
        prepare: ({ id }) => {
          return {
            title: "Tweet",
            subtitle: id
          };
        }
      }
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
      icon: ThListIcon,
      preview: {
        select: {
          table: "table"
        },
        prepare: ({ table }) => {
          const rows = table?.rows.length ?? 0;
          const columns = table?.rows[0]?.cells.length ?? 0;
          const rowsPlural = rows === 1 ? "row" : "rows";
          const columnsPlural = rows === 1 ? "column" : "columns";

          return {
            title: "Table",
            subtitle: `${rows} ${rowsPlural}, ${columns} ${columnsPlural}`
          };
        }
      }
    }
  ],
  validation: rule => rule.required()
}
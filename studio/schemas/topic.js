import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export default {
    name: "topic",
    type: "document",
    orderings: [
      orderRankOrdering
    ],
    fields: [
      {
        name: "name",
        title: "Name",
        description: "Appears in the navigation and page title",
        type: "string",
        validation: rule => rule.required()
      },
      {
        name: "longName",
        title: "Long Name",
        description: "Appears in topic page heading and post metadata section",
        type: "string"
      },
      {
        name: "slug",
        title: "Slug",
        type: "slug",
        options: {
          source: "name"
        },
        validation: rule => rule.required()
      },
      {
        name: "content",
        title: "Content",
        type: "array",
        of: [
          {
            type: "block",
            styles: [
              { title: 'Heading 2', value: 'h2' },
              { title: 'Heading 3', value: 'h3' },
              { title: 'Heading 4', value: 'h4' },
              { title: 'Heading 5', value: 'h5' },
              { title: 'Heading 6', value: 'h6' }
            ]
          }
        ],
        validation: rule => rule.required()
      },
      orderRankField({
        type: 'topic'
      })
    ]
  }
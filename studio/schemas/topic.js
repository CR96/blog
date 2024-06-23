import block from '../fields/block';
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
          block
        ],
        validation: rule => rule.required()
      },
      orderRankField({
        type: 'topic'
      })
    ]
  }
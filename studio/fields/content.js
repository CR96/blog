import alt from '@studio/fields/alt';
import caption from '@studio/fields/caption';
import block from '@studio/fields/block';
import { BookIcon, ImageIcon, PresentationIcon, ThListIcon, TwitterIcon, BlockquoteIcon } from "@sanity/icons";
import { toPlainText } from '@portabletext/toolkit';

export default {
    name: "content",
    title: "Content",
    type: "array",
    of: [
        {
            ...block,
            marks: {
                annotations: [
                    ...block.marks.annotations,
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
                    alt: 'alt',
                    asset: 'asset'
                },
                prepare: ({ alt, asset }) => {
                    return {
                        title: 'Image',
                        subtitle: alt,
                        media: asset
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
            name: "quote",
            title: "Quote",
            type: "object",
            icon: BlockquoteIcon,
            fields: [
                {
                    name: "quote",
                    title: "Quote",
                    type: "array",
                    description: "Don't include quotation marks",
                    of: [
                        block
                    ],
                    validation: rule => rule.required()
                },
                {
                    name: "attribution",
                    title: "Attribution",
                    type: "string",
                    description: "Don't include a dash or hyphen at the start"
                }
            ],
            preview: {
                select: {
                    quote: "quote"
                },
                prepare: ({ quote }) => {
                    return {
                        title: "Quote",
                        subtitle: quote ? toPlainText(quote) : false
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
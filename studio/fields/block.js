export default {
    type: "block",
    styles: [
        { title: 'Heading 2', value: 'h2' },
        { title: 'Heading 3', value: 'h3' },
        { title: 'Heading 4', value: 'h4' },
        { title: 'Heading 5', value: 'h5' },
        { title: 'Heading 6', value: 'h6' },
        { title: 'Blockquote', value: 'blockquote' }
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
                        validation: rule => rule.uri({
                            allowRelative: true
                        }).required()
                    }
                ]
            }
        ]
    }
};
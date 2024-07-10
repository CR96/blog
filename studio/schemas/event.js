import block from "../fields/block";

export default {
    name: 'event',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: rule => rule.required()
        },
        {
            name: 'date',
            title: 'Date',
            type: 'recurringDates',
            options: {
                dateTimeOptions: {
                    dateFormat: 'MMMM D, YYYY',
                    timeFormat: 'h:mm a'
                }
            },
            validation: rule => rule.required()
        },
        {
            name: 'location',
            title: 'Location',
            type: 'string'
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3
        },
        {
            name: 'accessibility',
            title: 'Accessibility',
            type: 'text',
            rows: 3
        },
        {
            name: 'links',
            title: 'Links',
            type: 'array',
            of: [
                {
                    name: 'link',
                    title: 'Link',
                    type: 'object',
                    fields: [
                        {
                            name: 'label',
                            title: 'Label',
                            type: 'string',
                            validation: rule => rule.required()
                        },
                        {
                            name: 'url',
                            title: 'URL',
                            type: 'url',
                            validation: rule => rule.required()
                        }
                    ]
                }
            ]
        },
    ]
};
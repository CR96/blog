import block from '../fields/block';

export default {
    name: 'subject',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: rule => rule.required()
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name'
            },
            validation: rule => rule.required()
        },
        {
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
                block
            ]
        }
    ]
};
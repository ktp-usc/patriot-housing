import { defineType, defineField } from 'sanity'

export const donationContent = defineType({
    name: 'donationContent',
    title: 'Donation Page Content',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Page Title',
            type: 'string',
            description: 'Title displayed on the donation page'
        }),
        defineField({
            name: 'mainMessage',
            title: 'Main Message',
            type: 'array',
            of: [{ type: 'block' }],
            description: 'Main message about Patriot Housing and donations'
        }),
        defineField({
            name: 'buttonText',
            title: 'Button Text',
            type: 'string',
            description: 'Text for the donation button'
        }),
        defineField({
            name: 'buttonUrl',
            title: 'Button URL',
            type: 'url',
            description: 'URL for the donation button'
        })
    ]
})
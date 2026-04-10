import { defineType, defineField } from 'sanity'

export const volunteerOpportunity = defineType({
    name: 'volunteerOpportunity',
    title: 'Volunteer Opportunity',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'linkText',
            title: 'Link Text',
            type: 'string',
            description: 'Text for the link (e.g., "Weekday and Saturday Dates")'
        }),
        defineField({
            name: 'emailSubject',
            title: 'Email Subject',
            type: 'string',
            description: 'Subject line used when this volunteer link is clicked',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'linkUrl',
            title: 'Link URL',
            type: 'string',
            description: 'URL for the link (can be # for placeholder)'
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Order to display this opportunity (lower numbers first)',
            validation: Rule => Rule.required().min(1)
        })
    ]
})
import { defineType, defineField } from 'sanity'

export const newsletterSettings = defineType({
    name: 'newsletterSettings',
    title: 'Newsletter Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'welcomeSubject',
            title: 'Welcome Email Subject',
            type: 'string',
            description: 'The subject line for the automated welcome email.',
            initialValue: 'Welcome to the Patriot Housing Newsletter!'
        }),
        defineField({
            name: 'welcomeMessage',
            title: 'Welcome Email Content',
            type: 'array',
            of: [{ type: 'block' }],
            description: 'The formatted message sent to new subscribers. Use {{firstName}} to dynamically insert their name. This will substitute to "there" if they did not provide a name.',
        })
    ]
})

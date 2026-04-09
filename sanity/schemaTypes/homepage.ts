import { defineType, defineField } from 'sanity'

export const homepage = defineType({
    name: 'homepage',
    title: 'Homepage',
    type: 'document',
    fields: [
        defineField({
            name: 'heroTitle',
            title: 'Hero Title',
            type: 'string',
            description: 'Main headline on the homepage hero section'
        }),
        defineField({
            name: 'heroSubtitle',
            title: 'Hero Subtitle',
            type: 'text',
            description: 'Subtitle text under the hero title'
        }),
        defineField({
            name: 'storyTitle',
            title: 'Story Section Title',
            type: 'string',
            description: 'Title for the "Watch Our Story" section'
        }),
        defineField({
            name: 'storyHeading',
            title: 'Story Section Heading',
            type: 'string',
            description: 'Main heading for the story section'
        }),
        defineField({
            name: 'storyContent',
            title: 'Story Content',
            type: 'array',
            of: [{ type: 'block' }],
            description: 'Content for the story section with video'
        }),
        defineField({
            name: 'missionTitle',
            title: 'Mission Section Title',
            type: 'string',
            description: 'Title for the mission section'
        }),
        defineField({
            name: 'missionHeading',
            title: 'Mission Section Heading',
            type: 'string',
            description: 'Main heading for the mission section'
        }),
        defineField({
            name: 'missionContent',
            title: 'Mission Content',
            type: 'array',
            of: [{ type: 'block' }],
            description: 'Content for the mission section'
        }),
        defineField({
            name: 'contactText',
            title: 'Contact Text',
            type: 'string',
            description: 'Text above the contact button'
        }),
        defineField({
            name: 'contactEmail',
            title: 'Contact Email',
            type: 'string',
            description: 'Email address for contact'
        }),
        defineField({
            name: 'youtubeUrl',
            title: 'YouTube Video URL',
            type: 'url',
            description: 'URL of the YouTube video to embed'
        })
    ]
})
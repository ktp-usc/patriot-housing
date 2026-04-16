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
        }),

        defineField({
            name: 'heroSubtitle',
            title: 'Hero Subtitle',
            type: 'text',
        }),

        defineField({
            name: 'carouselImages',
            title: 'Carousel Images',
            type: 'array',
            of: [
                defineField({
                    name: 'carouselImage',
                    title: 'Carousel Image',
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        defineField({
                            name: 'alt',
                            title: 'Alt Text',
                            type: 'string',
                        }),
                    ],
                }),
            ],
        }),

        defineField({
            name: 'storyTitle',
            title: 'Story Section Title',
            type: 'string',
        }),

        defineField({
            name: 'storyHeading',
            title: 'Story Section Heading',
            type: 'string',
        }),

        defineField({
            name: 'storyContent',
            title: 'Story Section Content',
            type: 'array',
            of: [{ type: 'block' }],
        }),

        defineField({
            name: 'missionTitle',
            title: 'Mission Section Title',
            type: 'string',
        }),

        defineField({
            name: 'missionHeading',
            title: 'Mission Section Heading',
            type: 'string',
        }),

        defineField({
            name: 'missionContent',
            title: 'Mission Section Content',
            type: 'array',
            of: [{ type: 'block' }],
        }),

        defineField({
            name: 'contactText',
            title: 'Contact Prompt',
            type: 'string',
        }),

        defineField({
            name: 'contactEmail',
            title: 'Contact Email',
            type: 'string',
            validation: Rule => Rule.email(),
        }),

        defineField({
            name: 'youtubeUrl',
            title: 'YouTube Embed URL',
            type: 'url',
        }),
    ],
})

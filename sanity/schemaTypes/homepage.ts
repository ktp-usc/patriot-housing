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
    ],
})
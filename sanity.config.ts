'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\app\studio\[[...tool]]\page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'

const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-04-08'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rqtjca7q'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
})

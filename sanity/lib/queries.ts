import { defineQuery } from 'groq'

export const HOMEPAGE_QUERY = defineQuery(`
  *[_type == "homepage"][0]{
    heroTitle,
    heroSubtitle,
    carouselImages,
    storyTitle,
    storyHeading,
    storyContent,
    missionTitle,
    missionHeading,
    missionContent,
    contactText,
    contactEmail,
    youtubeUrl
  }
`)

export const VOLUNTEER_OPPORTUNITIES_QUERY = defineQuery(`
  *[_type == "volunteerOpportunity"] | order(order asc){
    _id,
    title,
    description,
    linkText,
    emailSubject
  }
`)

export const DONATION_CONTENT_QUERY = defineQuery(`
  *[_type == "donationContent"][0]{
    title,
    mainMessage,
    buttonText,
    buttonUrl
  }
`)
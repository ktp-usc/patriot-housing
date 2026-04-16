import { createClient } from "next-sanity";

const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-04-08";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "rqtjca7q";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  stega: {
    studioUrl: "/studio",
  },
});

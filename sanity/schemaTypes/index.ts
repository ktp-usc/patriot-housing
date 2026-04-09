import { type SchemaTypeDefinition } from 'sanity'
import { homepage } from './homepage'
import { volunteerOpportunity } from './volunteerOpportunity'
import { donationContent } from './donationContent'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homepage, volunteerOpportunity, donationContent],
}

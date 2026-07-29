import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: '3nm2s1f6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})
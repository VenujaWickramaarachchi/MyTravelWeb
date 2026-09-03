export interface Accommodation {
  id: number

  title: {
    rendered: string
  }

  slug: string

  acf: {
    location?: string

    description?: string

    hotel_image?: string

    website_url?: string
  }
}

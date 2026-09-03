export interface Experience {
  id: number

  title: {
    rendered: string
  }

  slug: string

  acf: {
    short_description?: string

    experience_image?: string

    location?: string

    related_destinations?: number[]
  }
}

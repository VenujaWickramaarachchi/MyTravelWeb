export interface Tour {
  id: number

  title: {
    rendered: string
  }

  slug: string

  acf: {
    short_description?: string

    duration_days?: number

    duration_nights?: number

    price_from?: number

    currency?: string

    hero_title?: string

    hero_subtitle?: string

    hero_image?: string
  }
}

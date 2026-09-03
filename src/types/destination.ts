export interface Destination {
  id: number

  title: {
    rendered: string
  }

  slug: string

  content: {
    rendered: string
  }

  acf: {
    short_description?: string

    how_to_get_there?: string

    weather_by_season?: string

    google_maps_embed?: string

    featured_accommodations?: number[]

    nearby_destinations?: number[]
  }
}

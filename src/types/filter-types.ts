export interface TourFilterParams {
    region?: string
    tourType?: string
    duration?: string
    tourStyle?: string
    price?: string
    sort?: string
}
export interface DestinationFilterParams {
    region?: string
    destinationType?: string
}

export interface ExperienceFilterParams {
    region?: string
    experienceType?: string
}

export interface AttractionFilterParams {
    region?: string
    attractionType?: string
}
export interface AccommodationFilterParams {
    region?: string
    accommodationType?: string
}

export interface ItineraryFilterParams {
    itineraryLength?: string

}

export interface TravelGuideFilterParams {
    travelGuideTopic?: string
}

export interface FAQFilterParams {
    faqCategory?: string
}


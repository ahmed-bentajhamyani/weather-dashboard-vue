export interface SearchResponse {
    name: string
    local_names: LocalNames
    lat: number
    lon: number
    country: string
}

export interface LocalNames {
    et: string
    ru: string
}
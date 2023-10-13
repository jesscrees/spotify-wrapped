export {}

declare global {
  interface Image {
    height: number
    url: string
    width: number
  }
  interface UserProfileData {
    display_name: string
    images: Image[]
  }

  interface ArtistData {
    external_urls: {
      spotify: string
    }
    genres?: string[]
    href: string
    id: string
    name: string
    type: 'artist' | 'track'
    uri: string
  }

  interface TrackData {
    album: {
      artists: ArtistData[]
      id: string
      images: Image[]
      name: string
    }
    artists: ArtistData[]
    explicit: boolean
    href: string
    id: string
    name: string
    popularity: number
    preview_url: string
  }
}

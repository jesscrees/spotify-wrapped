export {}

declare global {
  interface UserProfileImage {
    height: number
    url: string
    width: number
  }
  interface UserProfileData {
    display_name: string
    images: UserProfileImage[]
  }
}

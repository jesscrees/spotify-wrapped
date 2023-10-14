import Image from 'next/image'
import styles from './ProfileData.module.css'

function ProfileData({ data }: { data: UserProfileData }) {
  return (
    <section className={styles.profileData}>
      <Image
        alt={`Spotify profile image for ${data.display_name}`}
        height={100}
        priority
        src={data.images[1].url}
        width={100}
      />

      <h1>{data.display_name}</h1>
    </section>
  )
}

export default ProfileData

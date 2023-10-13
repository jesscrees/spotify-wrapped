import Image from 'next/image'
import styles from './ProfileData.module.css'

function ProfileData({ data }: { data: UserProfileData }) {
  return (
    <section className={styles.profileData}>
      <Image
        alt="Profile pic of user"
        height={data.images[1].height}
        priority
        src={data.images[1].url}
        width={data.images[1].width}
      />

      <h1>{data.display_name}</h1>
    </section>
  )
}

export default ProfileData

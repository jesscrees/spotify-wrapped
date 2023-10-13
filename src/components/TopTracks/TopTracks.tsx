import styles from './TopTracks.module.css'

function TopTracks({ data }: { data: any }) {
  return (
    <section className={styles.topTracks}>
      <code>{JSON.stringify(data, null, 4)}</code>
    </section>
  )
}

export default TopTracks

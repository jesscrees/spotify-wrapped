import Image from 'next/image'
import styles from './TopTracks.module.css'

function TopTracks({ data }: { data: {items: TrackData[]} }) {
  return (
    <section className={styles.topTracks}>
      <h2>Top 5 tracks from the past 4 weeks</h2>
      <ol>
        {data.items.map((track: TrackData) => {
          return (
            <li key={track.id}>
              <Image alt={`Album art for ${track.album.name}`} src={track.album.images[0].url} height={100} width={100} />
              <h3>{track.name}</h3>
              <h4 className={styles.artistList}>
                {track.artists.map((artist: ArtistData) => {
                  return (
                    <span key={artist.name}>{artist.name}</span>
                  )
                })}
              </h4>
              <h4>Popularity of song: {track.popularity}/100</h4>
            </li>
          )
        })}
      </ol>

    </section>
  )
}

export default TopTracks

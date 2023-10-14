import { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './TopTracks.module.css'

function TopTracks({ data }: { data: TrackData[] }) {
  const [heading, setHeading] = useState<string>()

  function positionItemsInACircle() {
    // https://stackoverflow.com/questions/10152390/dynamically-arrange-some-elements-around-a-circle
    let deg = 0
    let radius = 200

    let fields = document.querySelectorAll<HTMLElement>('.track'), // the items to be positioned in a circle
      container = document.querySelector<HTMLElement>('#topTracksContainer'), // the container around the items
      width = container!.offsetWidth, // the width of the container
      height = container!.offsetHeight, // the height of the container
      angle = deg || Math.PI * 3.5,
      step = (2 * Math.PI) / fields.length

    // Loop over each field and position it appropriately
    fields.forEach((field) => {
      let x = Math.round(
        width / 2 + radius * Math.cos(angle) - field.offsetWidth / 2
      )
      let y = Math.round(
        height / 2 + radius * Math.sin(angle) - field.offsetHeight / 2
      )
      field.style.left = x + 'px'
      field.style.top = y + 'px'

      angle += step
    })
  }

  useEffect(() => {
    positionItemsInACircle()
  }, [data])

  return (
    <section className={styles.topTracks}>
      <h2 id="topTracksHeading">
        {heading || 'Top 5 tracks from the past 4 weeks'}
      </h2>

      <ol id="topTracksContainer">
        {data.map((track: TrackData) => {
          return (
            <li key={track.id} className="track">
              <Image
                alt={`Album art for ${track.album.name}`}
                height={100}
                onMouseEnter={() => setHeading(track.name)}
                onMouseLeave={() => setHeading('')}
                src={track.album.images[0].url}
                width={100}
              />
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export default TopTracks

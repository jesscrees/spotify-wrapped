import ProfileData from "@/components/ProfileData/ProfileData";
import TopTracks from "@/components/TopTracks/TopTracks";
import { getAccessToken, getTopTracks, getUserProfile, redirectToAuthCodeFlow } from "@/helpers";
import { useEffect, useState } from 'react';

import styles from '../styles/HomePage.module.css'

let didInit = false;

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [spotifyAccessToken, setSpotifyAccessToken] = useState('');
  const [profileData, setProfileData] = useState(null);
  const [topTracks, setTopTracks] = useState(null);
  
  // use useEffect to load data after the first render
  useEffect(() => {
    if (!didInit) {
      // Prevent call from happening twice during development
      didInit = true;

      // set loading to true before calling fetch
      setLoading(true);

      // Get code from url (code will exist on url after Spotify auth has happened)
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (!code) {
        // Authorise with Spotify
        redirectToAuthCodeFlow()
      } else {
        // Get access token
        getAccessToken(code).then(async (res) => {
          const accessToken = await res;

          if (accessToken) {
            setSpotifyAccessToken(accessToken)
            // Get data using access token
            const profileData = await getUserProfile(accessToken)
            setProfileData(profileData)
  
            // will also return popularity for those tracks
            // which we can collect together
            const topTracksData = await getTopTracks(accessToken, 'short_term');
            setTopTracks(topTracksData)

             // will also return genres & popularity for those artists
            // which we can collect together

            // Get Tracks' Audio Features
            // this will get us cool stuff like 'danceability'
            // we can send an array of 100 track IDs
          } else {
            // Authorise with Spotify
            redirectToAuthCodeFlow()
          }
        })
        .catch((e) => {
          // set the error if there's an error like 404, 400, etc
          if (e instanceof Error) {
            console.error(e)
            setError(e.message);
          }
        })
        .finally(() => {
          // set loading to false after everything has completed.
          setLoading(false);
        });
      }
    }
  }, []);
 
  // Loading component
  const loadingComponent = <div>Loading...</div>;
  // Error component
  const errorComponent = <div>Error: {error}</div>;

  return (
    <section className={styles.wrapper}>
      {loading ? (
        loadingComponent
      ) : error ? (
        errorComponent
      ) : (
        <section className={styles.container}>
          {profileData && <ProfileData data={profileData} />}

          {topTracks && <TopTracks data={topTracks} />}
        </section>
      )}
    </section>
  )
}

import { getAccessToken, getTopTracks, getUserProfile, redirectToAuthCodeFlow } from "@/helpers";
import { useEffect, useState } from 'react';

let didInit = false;

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
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
            // Get data using access token
            const profileData = await getUserProfile(accessToken)
            console.log('profileData', profileData)
            setData(profileData)
  
            const topTracksData = await getTopTracks(accessToken);
            console.log('topTracksData', topTracksData)
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
    <section>
      {loading ? (
        loadingComponent
      ) : error ? (
        errorComponent
      ) : (
        <div>
          <p>Loading complete and no errors. Displaying data...</p>
          <code>{JSON.stringify(data, null, 4)}</code>
        </div>
      )}
    </section>
  )
}

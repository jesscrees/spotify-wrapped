export async function getAccessToken(code: string): Promise<string> {
  const verifier = localStorage.getItem('verifier')

  const params = new URLSearchParams()
  params.append('client_id', process.env.NEXT_PUBLIC_CLIENT_ID!)
  params.append('grant_type', 'authorization_code')
  params.append('code', code)
  params.append('redirect_uri', process.env.NEXT_PUBLIC_REDIRECT_URI!)
  params.append('code_verifier', verifier!)

  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  })

  const { access_token } = await result.json()
  return access_token
}

// Redirects to Spotify login
// This will send us back to NEXT_PUBLIC_REDIRECT_URI after login
export async function redirectToAuthCodeFlow() {
  const verifier = generateCodeVerifier(128)
  const challenge = await generateCodeChallenge(verifier)

  localStorage.setItem('verifier', verifier)

  const scope = [
    'user-read-currently-playing', // currently playing
    'user-read-playback-state', // currently playing content & connected devices
    'user-follow-read', // currently followed artists/users
    'user-top-read', // user's top artists and tracks
    'user-read-recently-played', // recently played items
    'user-read-email', // user's email address
    'user-read-private', // user's subscription details
  ]

  const params = new URLSearchParams()
  params.append('client_id', process.env.NEXT_PUBLIC_CLIENT_ID!)
  params.append('response_type', 'code')
  params.append('redirect_uri', process.env.NEXT_PUBLIC_REDIRECT_URI!)
  params.append('scope', scope.join(' '))
  params.append('code_challenge_method', 'S256')
  params.append('code_challenge', challenge)

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`
}

function generateCodeVerifier(length: number) {
  let text = ''
  let possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

async function generateCodeChallenge(codeVerifier: string) {
  const data = new TextEncoder().encode(codeVerifier)
  const digest = await window.crypto.subtle.digest('SHA-256', data)
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

export async function getUserProfile(accessToken: string) {
  const response = await getSpotifyData(accessToken, 'v1/me')
  return response
}

export async function getTopArtists(accessToken: string) {
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks

  // time frames can be: long_term, medium_term, short_term
  // limit: 0 -50
  // this data can be paginated

  const response = await getSpotifyData(
    accessToken,
    'v1/me/top/artists?time_range=short_term&limit=5'
  )
  return response
}
export async function getTopTracks(accessToken: string, timeRange: string) {
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks

  // time frames can be: long_term, medium_term, short_term
  // limit: 0 -50
  // this data can be paginated

  const response = await getSpotifyData(
    accessToken,
    `v1/me/top/tracks?time_range=${timeRange}&limit=5`
  )
  return response
}

async function getSpotifyData(token: string, endpoint: string) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'GET',
  })
  return await res.json()
}

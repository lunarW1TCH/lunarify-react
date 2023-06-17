export const clientId = 'ad5be8cba1ee417e903709892157e5e5';
const redirectUri = 'http://localhost:3000/stats';

function generateCodeVerifier(length: number) {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

async function generateCodeChallenge(codeVerifier: string) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return btoa(
    String.fromCharCode.apply(null, Array.from(new Uint8Array(digest)))
  )
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export async function getAccessToken(
  code: string
): Promise<{ access_token: string; refresh_token: string }> {
  const verifier = localStorage.getItem('verifier');

  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append(
    'scope',
    'user-read-private user-read-email user-top-read playlist-modify-private user-library-read user-read-recently-played user-read-currently-playing'
  );
  params.append('redirect_uri', redirectUri);
  params.append('code_verifier', verifier!);

  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  });

  const resultJson = await result.json();

  const { access_token, refresh_token } = resultJson;
  console.log(resultJson);
  return { access_token, refresh_token };
}

export async function getRefreshToken(
  refreshToken: string
): Promise<{ access_token: string; refresh_token: string }> {
  const verifier = localStorage.getItem('verifier');

  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('grant_type', 'refresh_token');
  params.append('refresh_token', refreshToken);
  params.append(
    'scope',
    'user-read-private user-read-email user-top-read playlist-modify-private user-library-read user-read-recently-played user-read-currently-playing'
  );
  params.append('redirect_uri', redirectUri);
  params.append('code_verifier', verifier!);

  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  });

  const resultJson = await result.json();

  const { access_token, refresh_token } = resultJson;
  console.log(resultJson);
  return { access_token, refresh_token };
}

export async function redirectToAuthCodeFlow() {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem('verifier', verifier);

  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('response_type', 'code');
  params.append('redirect_uri', redirectUri);
  params.append(
    'scope',
    'user-read-private user-read-email user-top-read playlist-modify-private user-library-read user-read-recently-played user-read-currently-playing'
  );
  params.append('code_challenge_method', 'S256');
  params.append('code_challenge', challenge);

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

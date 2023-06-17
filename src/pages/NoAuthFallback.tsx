import { redirect } from 'react-router-dom';
import { getAccessToken, redirectToAuthCodeFlow } from '../helpers/auth';
import { getCookie, setCookie } from '../helpers/helpers';

const NoAuthFallbackPage = () => {
  console.log(document.cookie);
  const token = getCookie('authToken');
  const refreshToken = getCookie('refreshToken');
  console.log(token);

  const loginHandler = async () => {
    await redirectToAuthCodeFlow();
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (!code) return;
    const { access_token, refresh_token } = await getAccessToken(code);

    setCookie('authToken', access_token, 0.04);
    setCookie('refreshToken', refresh_token, 100);
    redirect('/stats');
  };

  if (token) {
    redirect('/stats');
  }

  return (
    <>
      <h1>Polska</h1>
      <button type="button" onClick={loginHandler}>
        Log in with Spotify!
      </button>
    </>
  );
};

export default NoAuthFallbackPage;

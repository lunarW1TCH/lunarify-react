import { getAccessToken, redirectToAuthCodeFlow } from '../helpers/auth';
import { getCookie, setCookie } from '../helpers/helpers';

let tokenFetched = false;

const NoAuthFallbackPage = () => {
  console.log(document.cookie);
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  const token = getCookie('authToken');
  const refreshToken = getCookie('refreshToken');
  console.log(token);

  const getToken = async () => {
    if (!code) return;
    const { access_token, refresh_token } = await getAccessToken(code);
    if (access_token) {
      setCookie('authToken', access_token, 0.04);
      tokenFetched = true;
    }

    if (refresh_token) {
      setCookie('refreshToken', refresh_token, 100);
    }
    window.location.reload();
  };

  const loginHandler = async () => {
    await redirectToAuthCodeFlow();
  };

  if (code && !tokenFetched) {
    getToken();
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

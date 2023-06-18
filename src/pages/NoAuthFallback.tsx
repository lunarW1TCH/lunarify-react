import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer';
import { getAccessToken, redirectToAuthCodeFlow } from '../helpers/auth';
import { setCookie } from '../helpers/helpers';
import StyleSheet from '../interfaces/StyleSheet';
import { StoreInterface } from '../store/store';

let tokenFetched = false;

const NoAuthFallbackPage = () => {
  const { t } = useTranslation();
  const theme = useSelector((state: StoreInterface) => state.ui.theme);
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

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

  const styles: StyleSheet = {
    fallbackContainer: {
      marginTop: 32,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      marginTop: 16,
      padding: 12,
      borderRadius: 24,
      borderColor: theme.primary500,
      backgroundColor: theme.primary300,
      cursor: 'pointer',
      fontSize: 16,
    },
    header: {
      borderRadius: 16,
      marginTop: 50,
      padding: 16,
      border: `2px solid`,
      alignItems: 'center',
      borderColor: theme.primary500,
      backgroundColor: theme.primary300,
      justifyContent: 'center',
    },
  };

  return (
    <div style={styles.fallbackContainer}>
      <h1 style={styles.header}>{t('fallback.header')}</h1>
      <p>{t('fallback.paragraph')}</p>
      <button style={styles.button} type="button" onClick={loginHandler}>
        {t('fallback.button')}
      </button>
      <Footer />
    </div>
  );
};

export default NoAuthFallbackPage;

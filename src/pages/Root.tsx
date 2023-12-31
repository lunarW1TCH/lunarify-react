import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Footer from '../components/Footer';
import MainNavigation from '../components/MainNavigation';
import { getCookie, setCookie } from '../helpers/helpers';
import NoAuthFallbackPage from './NoAuthFallback';
import StyleSheet from '../interfaces/StyleSheet';
import { uiActions } from '../store/ui-slice';
import { getRefreshToken } from '../helpers/auth';

const RootLayout = () => {
  const dispatch = useDispatch();
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

  useEffect(() => {
    const cookieTheme = getCookie('theme');
    if (cookieTheme) {
      dispatch(uiActions.setTheme(cookieTheme));
    }
  }, [dispatch]);

  const token = getCookie('authToken');
  const refreshToken = getCookie('refreshToken');

  const getToken = async () => {
    if (!token) {
      if (refreshToken && !code) {
        const newTokens = await getRefreshToken(refreshToken);

        if (newTokens.access_token) {
          setCookie('authToken', newTokens.access_token, 0.04);
        }
        if (newTokens.refresh_token) {
          setCookie('refreshToken', newTokens.refresh_token, 100);
          window.location.reload();
        }
      }
    }
  };

  getToken();

  if (!token) {
    return <NoAuthFallbackPage />;
  }

  const styles: StyleSheet = {
    main: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    rootContainer: {
      display: 'flex',
      height: '100%',
      flexDirection: 'column',
      flexGrow: 1,
      justifyContent: 'space-around',
    },
  };

  return (
    <div style={styles.rootContainer}>
      <main style={styles.main}>
        <MainNavigation />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;

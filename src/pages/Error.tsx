import { useTranslation } from 'react-i18next';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import Footer from '../components/Footer';
import MainNavigation from '../components/MainNavigation';
import StyleSheet from '../interfaces/StyleSheet';

const ErrorPage = () => {
  const error = useRouteError();
  const { t } = useTranslation();

  let h1 = t('error.header');
  let message = t('error.message');

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      h1 = t('error.header404');
      message = t('error.message404');
    }

    if (error.status === 500) {
      message = error.data.message;
    }
  }

  const styles: StyleSheet = {
    errorPageContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
  };

  return (
    <div style={styles.errorPageContainer}>
      <MainNavigation />
      <h1>{h1}</h1>
      <p>{message}</p>
      <Footer />
    </div>
  );
};

export default ErrorPage;

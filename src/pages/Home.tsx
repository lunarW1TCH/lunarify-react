import { useTranslation } from 'react-i18next';
import { setCookie } from '../helpers/helpers';
import StyleSheet from '../interfaces/StyleSheet';

const HomePage = () => {
  const { t } = useTranslation();

  const styles: StyleSheet = {
    containerHome: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };

  // setCookie('refreshToken', '', 0.01);
  // setCookie('authToken', '', 0.01);

  return (
    <div style={styles.containerHome}>
      <h1>{t('navigation.home')}</h1>
      <p>{t('home.welcome')}</p>
    </div>
  );
};

export default HomePage;

import { useTranslation } from 'react-i18next';
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

  return (
    <div style={styles.containerHome}>
      <h1>{t('navigation.home')}</h1>
      <p>{t('home.welcome')}</p>
    </div>
  );
};

export default HomePage;

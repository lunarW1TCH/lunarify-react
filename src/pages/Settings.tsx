import { useTranslation } from 'react-i18next';
import ChooseTheme from '../components/UI/ChooseTheme';
import StyleSheet from '../interfaces/StyleSheet';

const SettingsPage = () => {
  const { t } = useTranslation();
  const styles: StyleSheet = {
    SettingsPageContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };

  return (
    <div style={styles.SettingsPageContainer}>
      <div>
        <h1>{t('navigation.settings')}</h1>
      </div>
      <ChooseTheme />
    </div>
  );
};

export default SettingsPage;

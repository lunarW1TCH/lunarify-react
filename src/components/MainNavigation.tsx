import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useWindowDimensions } from '../helpers/helpers';
import StyleSheet from '../interfaces/StyleSheet';
import { StoreInterface } from '../store/store';

const MainNavigation = () => {
  const { t } = useTranslation();
  const theme = useSelector((state: StoreInterface) => state.ui.theme);
  const screenSize = useWindowDimensions();

  const styles: StyleSheet = {
    mainNavHeader: {
      display: 'flex',
      flexDirection: 'row',
      width: '90%',
      height: 50,
      backgroundColor: theme.primary300,
      alignItems: 'center',
      borderRadius: 8,
      marginLeft: 100,
      marginRight: 100,
      marginTop: 50,
      border: `2px solid`,
      borderColor: theme.primary500,
    },
    mainNav: {
      flex: 1,
    },
    navList: {
      listStyle: 'none',
      display: 'flex',
      justifyContent: 'space-evenly',
    },
    navLink: {
      textDecoration: 'none',
      fontSize: screenSize.width > 800 ? 18 : 14,
      color: 'black',
      flex: 1,
    },

    listElement: {
      flex: 1,
      textAlign: 'center',
    },
  };

  return (
    <header style={styles.mainNavHeader}>
      <nav style={styles.mainNav}>
        <ul style={styles.navList}>
          <li style={styles.listElement}>
            <NavLink style={styles.navLink} to="">
              {t('navigation.home')}
            </NavLink>
          </li>
          <li style={styles.listElement}>
            <NavLink style={styles.navLink} to="stats">
              {t('navigation.stats')}
            </NavLink>
          </li>
          <li style={styles.listElement}>
            <NavLink style={styles.navLink} to="settings">
              {t('navigation.settings')}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;

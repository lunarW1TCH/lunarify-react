import React, { SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { setCookie, useWindowDimensions } from '../../helpers/helpers';
import { Themes } from '../../store/themes';
import { uiActions } from '../../store/ui-slice';
import StyleSheet from '../../interfaces/StyleSheet';

const ChooseTheme = () => {
  const dispatch = useDispatch();
  const screenSize = useWindowDimensions();
  const { t } = useTranslation();

  const changeThemeHandler = (e: SyntheticEvent<HTMLSpanElement>) => {
    const { id } = e.currentTarget;
    dispatch(uiActions.setTheme(id));
    setCookie('theme', id, 999);
  };

  const changeThemeKeyHandler = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter') {
      const { id } = e.currentTarget;
      dispatch(uiActions.setTheme(id));
      setCookie('theme', id, 999);
    }
  };

  const styles: StyleSheet = {
    themesContainer: {
      display: 'flex',
      flexDirection: screenSize.width > 1000 ? 'column' : 'row',
      flexWrap: 'wrap',
      width: screenSize.width > 1000 ? 900 : 400,
      height: screenSize.width > 1000 ? 300 : 600,
      justifyContent: 'space-around',
      alignItems: 'center',
      margin: 24,
    },
    themeContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      width: 175,
      height: 100,
      margin: 2,
      color: 'black',
    },
    themeItem: {
      bottom: 16,
      left: 16,
      height: 40,
      width: 40,

      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 18,
      fontWeight: 'bold',
      border: `2px solid`,
      cursor: 'pointer',
    },
  };

  return (
    <>
      <h2>{t('themes.chooseTheme')}</h2>
      <div style={styles.themesContainer}>
        {Themes.map(theme => (
          <div
            key={theme.name}
            style={{
              ...styles.themeContainer,
              backgroundColor: theme.primary100,
            }}
          >
            <label htmlFor={theme.name}>{t(`themes.${theme.name}`)}</label>
            <span
              aria-label={`${theme.name} theme`}
              onClick={changeThemeHandler}
              onKeyDown={changeThemeKeyHandler}
              id={theme.name}
              role="button"
              tabIndex={0}
              style={{
                ...styles.themeItem,
                backgroundColor: theme.primary300,
                borderColor: theme.backgroundColor,
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ChooseTheme;

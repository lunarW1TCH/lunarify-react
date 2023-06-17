import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import OptionsLanguages from './options/OptionsLanguages';
import StyleSheet from '../interfaces/StyleSheet';
import { StoreInterface } from '../store/store';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const theme = useSelector((state: StoreInterface) => state.ui.theme);

  const styles: StyleSheet = {
    footer: {
      position: 'fixed',
      backgroundColor: theme.backgroundColor,
      bottom: 0,
      width: '100%',
      height: 24,
      textAlign: 'center',
      fontSize: 14,
    },
    language: {
      display: 'inline',
      marginLeft: 16,
      marginBottom: 16,
      border: 'none',
      backgroundColor: theme.backgroundColor,
      color: theme.backgroundColor === '#000000' ? '#ffffff' : '#000000',
    },
  };

  const [lang, setLang] = useState(document.documentElement.lang);

  const selectOnChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const { value } = e.currentTarget;
    document.documentElement.lang = value;
    setLang(value);
    i18n.changeLanguage(value);
  };

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    setLang(i18n.language);
  }, []);

  return (
    <footer style={styles.footer}>
      &copy;2023 Adrian Żegnałek, UICONS BY{' '}
      <a href="https://www.flaticon.com/">FLATICON</a>
      <select
        title="lang"
        style={styles.language}
        value={lang}
        id="selectLang"
        name="lang"
        onChange={selectOnChangeHandler}
      >
        <OptionsLanguages />
      </select>
    </footer>
  );
};

export default Footer;

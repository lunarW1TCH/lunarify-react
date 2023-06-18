import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { fetchArtists } from '../../helpers/spotifyApiFetch';
import ArtistItem from '../../components/artist/ArtistItem';
import { getCookie, useWindowDimensions } from '../../helpers/helpers';
import { statsActions } from '../../store/stats-slice';
import { StoreInterface } from '../../store/store';

import StatsTimeRange from '../../components/stats/StatsTimeRange';
import StyleSheet from '../../interfaces/StyleSheet';
import Spinner from '../../components/UI/Spinner';

const TopArtists = () => {
  const theme = useSelector((state: StoreInterface) => state.ui.theme);
  const screenSize = useWindowDimensions();
  const [hidden, setHidden] = useState(false);
  const { t } = useTranslation();
  const [range, setRange] = useState<string>('medium_term');
  const dispatch = useDispatch();
  const token = getCookie('authToken');
  const artists = useSelector((state: StoreInterface) => state.stats.artists);

  useEffect(() => {
    const getArtists = async () => {
      if (!token) return;
      if (range === 'short_term' && artists.short) return;
      if (range === 'medium_term' && artists.medium) return;
      if (range === 'long_term' && artists.long) return;
      const response = await fetchArtists(token, range);

      switch (range) {
        case 'short_term':
          dispatch(statsActions.setArtistsShort(response));
          break;
        case 'medium_term':
          dispatch(statsActions.setArtistsMedium(response));
          break;
        case 'long_term':
          dispatch(statsActions.setArtistsLong(response));
          break;
        default:
          break;
      }
    };

    getArtists();
  }, [dispatch, token, range, artists.short, artists.medium, artists.long]);

  const showHideHandler = () => {
    setHidden(prevState => !prevState);
  };

  const showHideEnterKeyHandler = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter') {
      setHidden(prevState => !prevState);
    }
  };

  const styles: StyleSheet = {
    artistsContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: screenSize.width > 800 ? 800 : '80%',
      justifyContent: 'center',
    },

    pageContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    statsHeader: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    showHideIcon: {
      cursor: 'pointer',
      marginLeft: 16,
      marginTop: 16,
      borderRadius: 4,
      backgroundColor: theme.mainTextColor,
      fontSize: 14,
      color: theme.backgroundColor,
      padding: 4,
    },
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.statsHeader}>
        <h1>{t('stats.artists')}</h1>
        <span
          onClick={showHideHandler}
          onKeyDown={showHideEnterKeyHandler}
          role="button"
          tabIndex={0}
        >
          <i style={styles.showHideIcon}>
            {hidden ? t('stats.show') : t('stats.hide')}
          </i>
        </span>
      </div>
      <StatsTimeRange range={range} setRange={setRange} />
      {!hidden && (
        <div style={styles.artistsContainer}>
          {range === 'medium_term' &&
            artists.medium &&
            artists.medium.items &&
            artists.medium.items.map((artist, index) => (
              <ArtistItem index={index} key={artist.id} data={artist} />
            ))}

          {range === 'medium_term' && !artists.medium && <Spinner />}
          {range === 'long_term' &&
            artists.long &&
            artists.long.items &&
            artists.long.items.map((artist, index) => (
              <ArtistItem index={index} key={artist.id} data={artist} />
            ))}
          {range === 'long_term' && !artists.long && <Spinner />}
          {range === 'short_term' &&
            artists.short &&
            artists.short.items &&
            artists.short.items.map((artist, index) => (
              <ArtistItem index={index} key={artist.id} data={artist} />
            ))}
          {range === 'short_term' && !artists.short && <Spinner />}
        </div>
      )}
    </div>
  );
};

export default TopArtists;

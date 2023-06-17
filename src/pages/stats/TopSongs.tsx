import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { fetchSongs } from '../../helpers/spotifyApiFetch';
import TrackItem from '../../components/track/TrackItem';
import { getCookie, useWindowDimensions } from '../../helpers/helpers';
import { statsActions } from '../../store/stats-slice';
import { StoreInterface } from '../../store/store';

import StatsTimeRange from '../../components/stats/StatsTimeRange';
import StyleSheet from '../../interfaces/StyleSheet';
import ShowIcon from '../../icons/show.png';
import HideIcon from '../../icons/hide.png';

const TopSongs = () => {
  const screenSize = useWindowDimensions();
  const [hidden, setHidden] = useState(false);
  const { t } = useTranslation();
  const [range, setRange] = useState<string>('medium_term');
  const token = getCookie('authToken');
  const songs = useSelector((state: StoreInterface) => state.stats.songs);
  const dispatch = useDispatch();

  useEffect(() => {
    const getSongs = async () => {
      if (!token) return;
      const response = await fetchSongs(token, range);

      switch (range) {
        case 'short_term':
          dispatch(statsActions.setSongsShort(response));
          break;
        case 'medium_term':
          dispatch(statsActions.setSongsMedium(response));
          break;
        case 'long_term':
          dispatch(statsActions.setSongsLong(response));
          break;
        default:
          break;
      }
    };

    getSongs();
  }, [dispatch, token, range]);

  const showHideHandler = () => {
    setHidden(prevState => !prevState);
  };

  const showHideEnterKeyHandler = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter') {
      setHidden(prevState => !prevState);
    }
  };

  const styles: StyleSheet = {
    songsContainer: {
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
      width: 24,
      height: 24,
      cursor: 'pointer',
      marginLeft: 16,
      marginTop: 8,
    },
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.statsHeader}>
        <h1>{t('stats.songs')}</h1>
        <span
          onClick={showHideHandler}
          onKeyDown={showHideEnterKeyHandler}
          role="button"
          tabIndex={0}
        >
          <img
            style={styles.showHideIcon}
            src={hidden ? ShowIcon : HideIcon}
            alt={hidden ? 'show' : 'hide'}
          />
        </span>
      </div>
      <StatsTimeRange range={range} setRange={setRange} />
      {!hidden && (
        <div style={styles.songsContainer}>
          {range === 'medium_term' &&
            songs.medium &&
            songs.medium.items &&
            songs.medium.items.map((song, index) => (
              <TrackItem index={index} key={song.id} data={song} />
            ))}
          {range === 'long_term' &&
            songs.long &&
            songs.long.items &&
            songs.long.items.map((song, index) => (
              <TrackItem index={index} key={song.id} data={song} />
            ))}
          {range === 'short_term' &&
            songs.short &&
            songs.short.items &&
            songs.short.items.map((song, index) => (
              <TrackItem index={index} key={song.id} data={song} />
            ))}
        </div>
      )}
    </div>
  );
};

export default TopSongs;

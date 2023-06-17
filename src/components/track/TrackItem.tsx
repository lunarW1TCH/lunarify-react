import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import StyleSheet from '../../interfaces/StyleSheet';
import { StoreInterface } from '../../store/store';

interface TrackItemProps {
  data: SpotifyApi.TrackObjectFull | undefined;
  index: number;
}

const TrackItem = (props: TrackItemProps) => {
  const { data, index } = props;
  const { t } = useTranslation();
  const theme = useSelector((state: StoreInterface) => state.ui.theme);

  const styles: StyleSheet = {
    trackItem: {
      border: `2px solid`,
      borderColor: theme.primary500,
      backgroundColor: theme.primary300,
      margin: 24,
      borderRadius: 8,
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      width: 300,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      height: 450,
      color: 'black',
    },
    containerImage: {
      width: '100%',
      position: 'relative',
    },
    trackImage: {
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      marginTop: -50,
      objectFit: 'cover',
      width: '100%',
      height: 300,
    },
    infoContainer: {
      display: 'flex',
      flexDirection: 'column',
      height: 100,
      fontSize: 18,
      justifyContent: 'space-between',
      padding: 4,
    },
    popularity: {
      fontSize: 15,
    },
    itemIndex: {
      position: 'absolute',
      bottom: 16,
      left: 16,
      height: 40,
      width: 40,
      backgroundColor: theme.primary300,
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 18,
      fontWeight: 'bold',
      border: `2px solid`,
      borderColor: theme.primary500,
    },
  };

  return (
    <div style={styles.trackItem}>
      <div style={styles.containerImage}>
        <img
          style={styles.trackImage}
          src={data?.album.images.at(1)?.url}
          alt={data?.name}
        />
        <div style={styles.itemIndex}>{index + 1}</div>
      </div>

      <div style={styles.infoContainer}>
        <p>{data?.name}</p>
        <p style={styles.popularity}>
          {t('stats.popularity')}: {data?.popularity}
        </p>
      </div>
    </div>
  );
};

export default TrackItem;

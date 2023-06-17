import { useWindowDimensions } from '../../helpers/helpers';
import StyleSheet from '../../interfaces/StyleSheet';
import TopArtists from './TopArtists';
import TopSongs from './TopSongs';

const StatsRootLayout = () => {
  const screenSize = useWindowDimensions();
  const styles: StyleSheet = {
    statsContainer: {
      display: 'flex',
      flexDirection: screenSize.width > 800 ? 'row' : 'column',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly',
    },
  };

  return (
    <div style={styles.statsContainer}>
      <TopArtists />
      <TopSongs />
    </div>
  );
};

export default StatsRootLayout;

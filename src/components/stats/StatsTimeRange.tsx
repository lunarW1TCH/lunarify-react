import { Dispatch } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useWindowDimensions } from '../../helpers/helpers';
import StyleSheet from '../../interfaces/StyleSheet';

import { StoreInterface } from '../../store/store';

interface StatsTimeRangeProps {
  range: string;
  setRange: Dispatch<string>;
}

const StatsTimeRange = (props: StatsTimeRangeProps) => {
  const { range, setRange } = props;
  const screenSize = useWindowDimensions();
  const theme = useSelector((state: StoreInterface) => state.ui.theme);
  const { t } = useTranslation();

  const onTimeRangeChangeHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const rangeValue = e.currentTarget.dataset.range as string;
    setRange(rangeValue);
  };

  const onTimeRangeKeyHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      const rangeValue = e.currentTarget.dataset.range as string;
      setRange(rangeValue);
    }
  };

  const styles: StyleSheet = {
    timeRangeContainer: {
      display: 'flex',
      borderRadius: 8,
      flexDirection: screenSize.width > 800 ? 'row' : 'column',
      width: screenSize.width > 800 ? 648 : 300,
      height: screenSize.width > 800 ? 50 : 150,
      justifyContent: screenSize.width > 800 ? 'space-around' : 'center',
      alignItems: 'center',
      border: `2px solid`,
      borderColor: theme.primary500,
      backgroundColor: theme.primary300,
      color: 'black',
    },
    range: {
      width: 216,
      display: 'flex',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    },
    activeRange: {
      height: 50,

      borderRadius: 8,

      backgroundColor: theme.primary500,
      border: `2px solid`,
      borderColor: theme.primary500,
    },
  };

  return (
    <div style={styles.timeRangeContainer}>
      <div
        role="tab"
        tabIndex={0}
        onClick={onTimeRangeChangeHandler}
        onKeyDown={onTimeRangeKeyHandler}
        data-range={'short_term'}
        style={
          range === 'short_term'
            ? { ...styles.range, ...styles.activeRange }
            : { ...styles.range }
        }
      >
        {t('stats.last4Weeks')}
      </div>
      <div
        role="tab"
        tabIndex={0}
        onClick={onTimeRangeChangeHandler}
        onKeyDown={onTimeRangeKeyHandler}
        data-range={'medium_term'}
        style={
          range === 'medium_term'
            ? { ...styles.range, ...styles.activeRange }
            : { ...styles.range }
        }
      >
        {t('stats.last6Months')}
      </div>
      <div
        role="tab"
        tabIndex={0}
        onClick={onTimeRangeChangeHandler}
        onKeyDown={onTimeRangeKeyHandler}
        data-range={'long_term'}
        style={
          range === 'long_term'
            ? { ...styles.range, ...styles.activeRange }
            : { ...styles.range }
        }
      >
        {t('stats.allTime')}
      </div>
    </div>
  );
};

export default StatsTimeRange;

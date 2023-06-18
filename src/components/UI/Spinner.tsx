import { useSelector } from 'react-redux';
import { StoreInterface } from '../../store/store';

import styles from './Spinner.module.scss';

const Spinner = () => {
  const theme = useSelector((state: StoreInterface) => state.ui.theme);

  return (
    <div style={{ marginTop: 16 }}>
      <div
        className={styles.loader}
        style={{ WebkitBorderBefore: `5px solid ${theme.primary300}` }}
      />
    </div>
  );
};

export default Spinner;

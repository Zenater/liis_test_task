import styles from './SortToggle.module.scss';
import { SortOrderType } from '../../types/types';

type Props = {
  label?: string;
  onChange?: (newValue: SortOrderType) => void;
  selected?: boolean;
  order?: SortOrderType;
  className?: string;
};

export const SortToggle = ({ label, onChange, selected, order }: Props) => {
  return (
    <div
      className={
        selected ? `${styles.selected} ${styles.sortToggle}` : styles.sortToggle
      }
      onClick={() => onChange?.(order === 'up' ? 'down' : 'up')}
    >
      {label}
      <div className={styles.arrows}>
        <div
          className={`${order === 'up' ? styles.highlight : ''} ${
            styles.arrow
          }`}
        />
        <div
          className={`${order === 'down' ? styles.highlight : ''} ${
            styles.arrow
          }`}
        />
      </div>
    </div>
  );
};

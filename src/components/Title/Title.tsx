import { ReactComponent as Vector } from '../../assets/icons/vectorRight.svg';
import styles from './Title.module.scss';

type Props = {
  items: string[];
};

export const Title = ({ items }: Props) => {
  return (
    <ol className={styles.breadcrumbs}>
      {items.map((item, index) => (
        <li key={index}>
          {index > 0 && <Vector />}
          {item}
        </li>
      ))}
    </ol>
  );
};

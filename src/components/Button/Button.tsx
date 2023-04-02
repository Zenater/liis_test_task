import { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';

type Props = {
  size?: 'auto' | 'fill';
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ size = 'fill', ...props }: Props) => {
  return <button className={`${styles.button} ${styles[size]}`} {...props} />;
};

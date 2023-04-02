import { forwardRef, useId } from 'react';
import styles from './TextField.module.scss';

type Props = {
  id?: string;
  label: string;
  boldLabel?: boolean;
  error?: string;
  [key: string]: any;
};

export const TextField = forwardRef<HTMLInputElement, Props>(
  ({ id, label, error, boldLabel, ...rest }, ref) => {
    const elementId = useId();
    const inputId = id || elementId;

    return (
      <div
        className={
          error ? `${styles.textField} ${styles.error}` : styles.textField
        }
      >
        <label
          htmlFor={inputId}
          className={`${styles.textField} ${boldLabel ? styles.bold : ''}`}
        >
          {label}
        </label>
        <input id={inputId} ref={ref} {...rest} />
        {error && <p>{error}</p>}
      </div>
    );
  }
);

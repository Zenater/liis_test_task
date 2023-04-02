import React, { ReactNode } from 'react';
import styles from './Box.module.scss';

type Props = {
  className?: string;
  children: ReactNode;
};

export const Box = ({ className, children }: Props) => {
  const classes = className ? `${className} ${styles.box}` : styles.box;
  return <div className={classes}>{children}</div>;
};

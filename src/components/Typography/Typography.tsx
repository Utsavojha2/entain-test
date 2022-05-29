import React, { ComponentPropsWithoutRef } from 'react';
import styles from 'components/Typography/Typography.module.scss';

interface ITypographyProps extends ComponentPropsWithoutRef<'h1'> {
  children: React.ReactNode;
}

const H1 = ({ children, className, ...props }: ITypographyProps) => {
  return (
    <h1 className={[styles.h1, className].join(' ')} {...props}>
      {children}
    </h1>
  );
};

export const H2 = ({ children, className, ...props }: ITypographyProps) => {
  return (
    <h2 className={[styles.h2, className].join(' ')} {...props}>
      {children}
    </h2>
  );
};

export const P1 = ({ children, className, ...props }: ITypographyProps) => {
  return (
    <p className={[styles.p1, className].join(' ')} {...props}>
      {children}
    </p>
  );
};

export const P2 = ({ children, className, ...props }: ITypographyProps) => {
  return (
    <p className={[styles.p2, className].join(' ')} {...props}>
      {children}
    </p>
  );
};

export default H1;

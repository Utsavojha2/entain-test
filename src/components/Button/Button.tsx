import React, { ComponentPropsWithoutRef } from 'react';
import styles from 'components/Button/Button.module.scss';

interface IButtonComponentType extends ComponentPropsWithoutRef<'button'> {
  children: React.ReactNode;
}

export const PrimaryButton = ({
  children,
  className,
  ...props
}: IButtonComponentType) => {
  return (
    <button
      {...props}
      className={[styles.button, styles.button__primary, className].join(' ')}
    >
      {children}
    </button>
  );
};

export const SecondaryBtn = ({
  children,
  className,
  ...props
}: IButtonComponentType) => {
  return (
    <button
      {...props}
      className={[styles.button, styles.button__secondary, className].join(' ')}
    >
      {children}
    </button>
  );
};

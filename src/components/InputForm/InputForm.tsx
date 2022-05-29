import React, { forwardRef } from 'react';
import styles from 'components/InputForm/InputForm.module.scss';

const InputForm = forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<'input'>
>((props, ref) => (
  <input
    {...props}
    className={[styles.formItem, props.className].join(' ')}
    ref={ref}
  />
));

export default InputForm;

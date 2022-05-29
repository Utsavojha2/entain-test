import React from 'react';
import styles from 'components/Modal/Modal.module.scss';

interface CustomModalProps {
  isVisible: boolean;
  children: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({ isVisible, children }) => {
  return (
    <section
      className={[styles.customModal, !isVisible && styles.hiddenModal].join(
        ' '
      )}
    >
      <div className={styles.customModal__content}>{children}</div>
    </section>
  );
};

export default CustomModal;

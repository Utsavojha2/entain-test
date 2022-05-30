import { FC, useState, useRef, MutableRefObject, useEffect } from 'react';
import Modal from 'components/Modal/Modal';

import H1, { P1 } from 'components/Typography/Typography';
import InputForm from 'components/InputForm/InputForm';
import { PrimaryButton, SecondaryBtn } from 'components/Button/Button';
import styles from 'features/ModalPopup/ModalPopup.module.scss';

interface ModalPopupProps {
  postUsername: (name: string) => void;
}

const ModalPopup: FC<ModalPopupProps> = ({ postUsername }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPopupVisible] = useState(true);
  const [userName, setUsername] = useState('');
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

  const onClearText = () => {
    setUsername('');
    inputRef.current.focus();
  };

  const onUsernameSubmit = async () => {
    if (!userName) return;
    try {
      setIsSubmitting(true);
      await postUsername(userName);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // inputRef.current.focus();
  }, []);

  return (
    <div className={styles.modalPopup}>
      <Modal isVisible={isPopupVisible}>
        <H1 className={styles.modalPopup__header}>Entain Task</H1>
        <P1>
          Fill in your username to join see the board and list of available
          notes
        </P1>
        <InputForm
          type='text'
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Enter your username'
          ref={inputRef}
        />
        <div className={styles.modalPopup__buttons}>
          {!!userName && (
            <SecondaryBtn onClick={onClearText}>Clear Text</SecondaryBtn>
          )}
          <PrimaryButton
            disabled={isSubmitting || !userName}
            title={!userName ? 'Enter username to proceed' : ''}
            onClick={onUsernameSubmit}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </PrimaryButton>
        </div>
      </Modal>
    </div>
  );
};

export default ModalPopup;

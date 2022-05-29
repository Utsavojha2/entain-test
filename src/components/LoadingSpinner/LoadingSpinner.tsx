import styles from 'components/LoadingSpinner/LoadingSpinner.module.scss';

const LoadingSpinner: React.FC = () => {
  return (
    <div className={styles.spinner}>
      <div className={styles.spinner__loading} />
    </div>
  );
};

export default LoadingSpinner;

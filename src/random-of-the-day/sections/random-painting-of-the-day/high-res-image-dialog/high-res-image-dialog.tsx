import { useEffect } from 'react';
import UnitTestCheck from '../../../../components/unit-test-check/unit-test-check';

import styles from './high-res-image-dialog.module.scss';

export interface HighResImageDialogProps {
  imageUrl: string;
  onClose: () => void;
}

export default function HighResImageDialog({
  imageUrl,
  onClose,
}: HighResImageDialogProps): JSX.Element {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <dialog className={styles.dialog} onClick={onClose}>
      <UnitTestCheck componentName="HighResImageDialog" />
      <img
        className={styles.highResImage}
        src={imageUrl}
        alt="Expanded high resolution image"
        role="img"
        onClick={(event) => event.stopPropagation()}
      />
      <button className={styles.close} aria-label="Close dialog">
        {String.fromCharCode(10799)}
      </button>
    </dialog>
  );
}

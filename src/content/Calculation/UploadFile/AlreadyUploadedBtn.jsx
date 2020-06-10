import Button from '../../../commonComponents/Button/Button';
import styles from './uploadFile.module.scss';
import React from 'react';

export function AlreadyUploadedBtn(props) {
  return (
      <>
          <Button small text='Already uploaded'
                  onClick={() => {
                  }}
                  className={styles['already-uploaded-btn']}
          />
      </>
  );
}

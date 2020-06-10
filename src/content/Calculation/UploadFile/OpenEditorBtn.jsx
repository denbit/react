import Button from '../../../commonComponents/Button/Button';
import styles from './uploadFile.module.scss';
import React from 'react';

export function OpenEditorBtn(props) {
  return (
      <>
        <Button small text='Open editor' onClick={() => {
        }} className={styles['open-editor-btn']}/>

      </>
  );
}

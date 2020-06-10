import React from 'react';
import styles from './uploadFile.module.scss';
import Button from '../../../commonComponents/Button/Button';

export function UploadFileBtn({onUpload}) {
  const input = React.createRef();
  return (
      <>
        <input type="file" id="input" multiple ref={input} onChange={() => onUpload(input)}
               className={styles['input-file']}/>
        <Button small text='Upload file'
                className={styles['upload-file-btn']}
                onClick={() => input.current.click()}
        />

      </>
  );
}

import Button from '../../../commonComponents/Button/Button';
import styles from './alreadyUploadedBtn.module.scss';
import React, {useEffect, useState} from 'react';
import {getAll} from '../../../services/filesService'

function AlreadyUploadedLine ({file,addFileClick, categoryType}) {
    return (
        <div key={file.id} className={styles.line} onClick={() => {addFileClick(file.id,file.name, categoryType)}}>
            {file.name}
        </div>
    )
}

export function AlreadyUploadedBtn({categoryType, selectedFiles, addFileClick}) {
    console.log(selectedFiles);
    const [toggle, setToggle] = useState(false)
    const [files, setFiles] = useState(0)

    useEffect(() => {
        getAll().then(resultArray => {
            setFiles(resultArray);
        })
    }, [])

  return (
      <>
          <div className={styles['already-uploaded-container']}>
          <Button small text='Already uploaded'
                  onClick={() => {setToggle(!toggle)
                  }}
                  className={styles['already-uploaded-btn']}
          />
          { toggle && <div className={styles.select}>
              <div className={styles.file}>
                  { files.length && (files.map((file) => {
                      return selectedFiles && (selectedFiles.some((selectedFile) => {
                          return selectedFile.id === file.id })) ? <></> : <AlreadyUploadedLine file={file} categoryType={categoryType} addFileClick={addFileClick}/>;

                  })
                  ) || <div className={styles.line}>No files were uploaded jet</div>
                  }
              </div>
          </div>
          }
      </div>
      </>
  );
}

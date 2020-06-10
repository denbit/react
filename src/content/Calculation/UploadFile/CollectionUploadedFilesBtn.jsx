import Button from '../../../commonComponents/Button/Button';
import styles from './uploadFile.module.scss';
import React, {useEffect, useState} from 'react';

export function CollectionUploadedFilesBtn({categoryType, removeFileFromState, selectedFiles}) {
    const [fileNames,setFileNames] = useState([])

    function removeFile(fileId, fileNames) {
        const removed = fileNames.filter((file)=>{
            return file.id !== fileId
        })
        setFileNames(removed)
        removeFileFromState(fileId, categoryType)
    }

    useEffect(()=>{
        if(selectedFiles[categoryType] !== undefined) {
            const tempArray=[];
            selectedFiles[categoryType].forEach((currentObj)=>{
                tempArray.push({ fileName: currentObj.fileName.slice(0, 11) + '...', id: currentObj.id})
                console.log('tempArray',tempArray);
            })
            setFileNames(tempArray);
        }
    },[selectedFiles[categoryType]])

  return (
      <>
          <div className={styles['collection-container']}>
          { fileNames && fileNames.map((file)=>{
              return (<Button key={file.id} small text={file.fileName}
                      onClick={() => { removeFile(file.id, fileNames)
                      }}
                      styled={[styles['file-items'], styles.multiselect]}
              />)
          })
          }
          </div>
      </>
  );
}

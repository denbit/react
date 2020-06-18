import React, {useEffect, useState} from 'react';
import styles from '../orders.module.scss';
import {readFile} from '../../../../services/filesService';

export default function InboundData({inboundData, ids}) {
    const [url, setUrl] = useState({});
    useEffect(() => {
        const files = {};
        readFile(ids).then((value) => {
            value.forEach((fileIDB) => {
                const content = fileIDB.content;
                const typedArray = new Uint8Array(content.length);
                for (let i = 0; i < content.length; i++) {
                    typedArray[i] = content.charCodeAt(i);
                }
                const newFile = new File([typedArray], `${fileIDB.name}`, {
                    type: fileIDB.type,
                });
                const item = inboundData.find((item) => item.fileName === fileIDB.name);
                files[item.id] = window.URL.createObjectURL(newFile);
                setUrl(files);
            });
        });

    }, []);

    return (inboundData.map((file) => {

            return (
                <a key={file.id} id='link' href={file.id in url && url[file.id]} className={styles['sent-files']}
                   download={file.fileName} target="_blank" onClick={() => {
                    window.URL.revokeObjectURL(url[file.id]);
                }}>{file.fileName}</a>
            );
        })
    );
}

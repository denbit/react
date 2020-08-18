import React, {useEffect, useState} from 'react';
import tabStyle from '../../../Calculation/tabs.module.scss';
import {translate} from '../../../../func.list';
import {withTranslationConsumer} from '../../../../services/LanguageContext';
import classNames from 'classnames';
import styles from '../oldOrders.module.scss';

function Preview({outboundFile, index, translation}) {
    const [src, setSrc] = useState({});
    useEffect(() => {
        const files = {};

        const {content, fileName, fileType} = {...outboundFile};
        const decodedContent = atob(content);
        const typedArray = new Uint8Array(decodedContent.length);
        for (let i = 0; i < decodedContent.length; i++) {
            typedArray[i] = decodedContent.charCodeAt(i);
        }
        const newFile = new File([typedArray], `${fileName}`, {
            type: fileType,
        });

        files[index] = window.URL.createObjectURL(newFile);
        setSrc(files);

    }, []);
    return (
        <div className={classNames(tabStyle.id_label, styles['align-center'])}>
            <h2>{translate(translation, `preview.title`) + ' ' + outboundFile.fileName}</h2>
            <img src={src[index]}/>
        </div>
    );

}

export default withTranslationConsumer(Preview);

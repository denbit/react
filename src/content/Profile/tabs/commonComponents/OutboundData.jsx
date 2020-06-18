import React, {useState} from 'react';
import styles from '../orders.module.scss';
import {ModalContainer} from '../../../../commonComponents/ModalForm/ModalContanainer';
import Preview from './Preview';

export default function OutboundData({outboundData}) {

    const [isShow, setIsShow] = useState(false);

    return outboundData.map((file, index) => {
        return (<>
            <div key={index} className={styles['sent-files']} onClick={() => {
                setIsShow(!isShow);
            }}>{file.fileName}</div>
            {
                isShow && <ModalContainer isShow={isShow} toggleModal={() => {
                    setIsShow(!isShow);
                }}>
                    <Preview outboundFile={file} index={index}/>
                </ModalContainer>
            }
        </>);
    });
}

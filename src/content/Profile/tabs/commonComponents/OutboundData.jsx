import React from 'react';
import styles from "../orders.module.scss";

export default function OutboundData({collection}) {

    return    <td>{collection.outboundData.map((file, index) => {
        return (
            <div key={index}>
                <div className={styles['sent-files']} onClick={() => {
                    console.log('preview');
                }}>{file.fileName}</div>
            </div>
        )
    })}
    </td>
}

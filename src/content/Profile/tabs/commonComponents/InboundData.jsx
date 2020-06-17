import React from 'react';
import styles from "../orders.module.scss";

export default function InboundData({collection}) {

        return    <td>{collection.inboundData.map((file) => {
            const data = {x: 123, s: "hello, world123", d: new Date()},
                fileName = "my-download.json";
            var json = JSON.stringify(data),
                blob = new File([json], fileName, {type: "octet/stream"}),
                url = window.URL.createObjectURL(blob);
            console.log('blob',blob)
            console.log('url',url)

            return (
                <div key={file.id}>
                    <a id='link' href={url} className={styles['sent-files']} onClick={() => {
                        this.saveData()
                    }}>{file.fileName}</a>
                </div>
            )
        })}
        </td>
}

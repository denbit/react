import React from 'react'
import Button from '../../commonComponents/Button/Button'
import styles from './UploadFile.module.scss'

function UploadButton(props: {}) {
    return (
        <>
            <Button styled={styles['upload-btn']}
                    onClick={props.toggleModal}
                    text='Завантажити'/>
        </>
    )
}

export default UploadButton
import React from 'react'
import Button from '../../commonComponents/Button/Button'
import styles from './UploadFile.module.scss'
import {translate} from "../../func.list";
import {withTranslationConsumer} from "../../services/LanguageContext";

function UploadButton({translation, toggleModal}) {
	return (
		<>
			<Button styled={styles['upload-btn']}
					onClick={toggleModal}
					text={translate(translation, 'buttons.create_order')}/>
		</>
	)
}

export default withTranslationConsumer(UploadButton)
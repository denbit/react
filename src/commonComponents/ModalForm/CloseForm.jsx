import React from 'react';
import styles from './closeForm.module.scss'

function CloseForm(props) {
	return (
		<>
			<div className={styles['close-button-container']} onClick={props.toggleModal}>
				<img src='/imgs/close.svg' alt={'close'} className={styles['size-img']}/>
			</div>

		</>
	)

}

export default CloseForm
import React from 'react';
import styles from './form.module.scss';
import CloseForm from "./CloseForm";

function ModalForm(props: {}) {
	return (
		<div className={styles.modal}>
			<CloseForm toggleModal={props.toggleModal}/>
			{props.children}
		</div>
	)
}

export default ModalForm
import ReactDOM from "react-dom";
import ModalForm from "./index";
import styles from './form.module.scss'
import React from "react";

export const ModalContainer = (props) => {
	const rootModal = document.getElementById('rootModal');
	console.log('rootModal', rootModal);
	const ModalPortal = ReactDOM.createPortal(
		<div className={styles.container}>
			<ModalForm/>
		</div>
		, rootModal);

	return props.show ? ModalPortal : <></>;

}
import ReactDOM from "react-dom";
import ModalForm from "./index";
import styles from './form.module.scss'
import React from "react";

export const ModalContainer = (props) => {
	const rootModal = document.getElementById('rootModal');
	const ModalPortal = ReactDOM.createPortal(
		<div className={styles.container}>
			<ModalForm toggleModal={props.toggleModal}>
				{props.children}
			</ModalForm>
		</div>
		, rootModal);

	return props.isShow ? ModalPortal : <></>;

};
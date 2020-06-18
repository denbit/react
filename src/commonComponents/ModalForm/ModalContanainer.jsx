import ReactDOM from "react-dom";
import ModalForm from "./index";
import styles from './form.module.scss'
import React from "react";

export const ModalContainer = (props) => {
	let ModalPortal;
	const rootModal = document.getElementById('root');
	ModalPortal = ReactDOM.createPortal(
		<div className={styles.container}>
			<ModalForm toggleModal={props.toggleModal}>
				{props.children}
			</ModalForm>
		</div>
		, rootModal);
	return props.isShow ? ModalPortal : <></>;
};

import ReactDOM from "react-dom";
import ModalForm from "./index";
import styles from './form.module.scss'
import React from "react";
// const element = document.createElement('div');
// element.setAttribute('id','rootModal')
// document.getElementById('root').appendChild(element)
export const ModalContainer = (props) => {

	let ModalPortal;
	const rootModal = document.getElementById('root');
	// useEffect(()=>()=>document.getElementById('root').removeChild(rootModal))
	ModalPortal = ReactDOM.createPortal(
		<div className={styles.container}>
			<ModalForm toggleModal={props.toggleModal}>
				{props.children}
			</ModalForm>
		</div>
		, rootModal);


	return props.isShow ? ModalPortal : <></>;

};
import React, {Component} from "react";
import * as calcHeader from '../calculationHeader.html'
import * as calcTable from '../calculation_en.html.json'
import Screen from "./Screen";
import UploadFile from './UploadFile/UploadFile'
import {ModalContainer} from "./ModalForm/ModalContanainer";

export class Calculation extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			isShow: false
		}
		this.showModal = this.showModal.bind(this);
	}

	showModal() {
		this.setState({isShow: !this.state.isShow})
	}

	render() {
		return (
			<>
				<Screen page={calcHeader.content}/>
				<UploadFile onClick={this.showModal}/>
				<Screen page={calcTable.content}/>
				<ModalContainer show={this.state.isShow}/>
			</>
		)
	}
}

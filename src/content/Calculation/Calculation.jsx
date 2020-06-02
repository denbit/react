import React, {Component} from "react";
import * as calcHeader from '../../calculationHeader.html'
import * as calcTable from '../../calculation_en.html.json'
import Screen from "../Screen";
import UploadFile from '../UploadFile/UploadFile'
import {ModalContainer} from "../../commonComponents/ModalForm/ModalContanainer";
import {ProgressBar} from "./ProgressBar";
import {StageControl} from "./StageControl";

export class Calculation extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			isShow: false,
			stage: 0
		};
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
				<ModalContainer show={this.state.isShow}>
					<ProgressBar/>
					<StageControl/>
				</ModalContainer>
			</>
		)
	}
}

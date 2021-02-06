import React, {Component} from "react";
import * as calcHeader from '../../calculationHeader.html'
import * as calcTable from '../../calculation_en.html.json'
import Screen from "../Screen";
import UploadButton from '../UploadFile/UploadButton'
import {ModalContainer} from "../../commonComponents/ModalForm/ModalContanainer";
import {ProgressBar} from "./ProgressBar";
import {StageControl} from "./StageControl";
import {SelectCategories} from "./SelectCategories";
import FillPersonalData from "./FillPersonalData";
import UploadFile from "./UploadFile";
import SuccessModal from "./SuccessModal";

export class Calculation extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			isShow: false,
			currentStep: 0,
			steps: [SelectCategories, UploadFile, FillPersonalData, SuccessModal],
			selectedCategories: null,

		};
		this.toggleModal = this.toggleModal.bind(this);
		this.nextStep = this.nextStep.bind(this);
		this.previousStep = this.previousStep.bind(this);
	}

	toggleModal() {
		this.setState({isShow: !this.state.isShow})
		if (this.state.currentStep === this.state.steps.length - 1) {
			this.setState({currentStep: 0})
		}
	}

	nextStep() {
		this.setState({currentStep: this.state.currentStep + 1})
	}

	previousStep() {
		this.setState({currentStep: this.state.currentStep - 1})
	}

	render() {
		return (
			<>
				<Screen page={calcHeader.content}/>
				<UploadButton toggleModal={this.toggleModal}/>
				<Screen page={calcTable.content}/>
				<ModalContainer isShow={this.state.isShow} toggleModal={this.toggleModal}>
					<ProgressBar currentStep={this.state.currentStep} steps={this.state.steps}/>
					<StageControl steps={this.state.steps} currentStep={this.state.currentStep} nextStep={this.nextStep}
								  previousStep={this.previousStep}/>
				</ModalContainer>
			</>
		)
	}
}

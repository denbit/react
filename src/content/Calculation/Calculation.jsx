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
import {fetchCategories} from "../../services/calculationService";

export class Calculation extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			isShow: false,
			currentStep: 0,
			steps: [SelectCategories, UploadFile, FillPersonalData, SuccessModal],
			stageActions: {
				firstStep: {
					selectedCategories: [],
					categories: null,
				},
				secondStep: {
					selectedFiles: null,
					categories: null,
				},
				thirdStep: {
					personalData: {
						phone: null,
					},
				},
			},


		};

		this.toggleModal = this.toggleModal.bind(this);
		this.nextStep = this.nextStep.bind(this);
		this.previousStep = this.previousStep.bind(this);
		this.moveToSelected = this.moveToSelected.bind(this);
		this.moveToAvailableCategories = this.moveToAvailableCategories.bind(this);
		this.methods = {
			moveToSelected: this.moveToSelected,
			moveToAvailableCategories: this.moveToAvailableCategories,
		}
	}

	toggleModal() {

		if (!this.state.isShow) {
			fetchCategories().then((res) => {
				const newState = {...this.state};
				newState.stageActions.firstStep.categories = res;
				this.setState(newState);
			}).catch((err) => {
				throw err
			})
		}
		this.setState({isShow: !this.state.isShow})
		// if (this.state.currentStep === this.state.steps.length - 1) {
		// 	this.setState({currentStep: 0})
		// }


	}

	nextStep() {
		this.setState({currentStep: this.state.currentStep + 1})
	}

	previousStep() {
		this.setState({currentStep: this.state.currentStep - 1})
	}

	moveToSelected(category) {
		const newState = {...this.state};
		const selected = this.state.stageActions.firstStep.selectedCategories;
		newState.stageActions.firstStep.selectedCategories = [...selected, category];
		newState.stageActions.firstStep.categories.map((item, index, array) => {
			if (item.id === category.id) array.splice(index, 1)
			else return item
		});
		this.setState(newState)
	}

	moveToAvailableCategories(category) {
		const newState = {...this.state};
		const categories = this.state.stageActions.firstStep.categories;
		newState.stageActions.firstStep.categories = [...categories, category];
		newState.stageActions.firstStep.selectedCategories.map((item, index, array) => {
			if (item.id === category.id) array.splice(index, 1)
			else return item
		})
		this.setState(newState)
	}

	render() {
		return (
			<>
				<Screen page={calcHeader.content}/>
				<UploadButton toggleModal={this.toggleModal}/>
				<Screen page={calcTable.content}/>
				<ModalContainer isShow={this.state.isShow} toggleModal={this.toggleModal}>
					<ProgressBar currentStep={this.state.currentStep} steps={this.state.steps}/>
					<StageControl steps={this.state.steps} currentStep={this.state.currentStep} methods={this.methods}
								  nextStep={this.nextStep}
								  previousStep={this.previousStep} stageActions={this.state.stageActions}/>
				</ModalContainer>
			</>
		)
	}
}

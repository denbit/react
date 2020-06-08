import React, {Component} from "react";
import * as calcHeader from '../../calculationHeader.html'
import * as calcTable from '../../calculation_en.html.json'
import Screen from "../Screen";
import UploadButton from '../UploadFile/UploadButton'
import {ModalContainer} from "../../commonComponents/ModalForm/ModalContanainer";
import {ProgressBar} from "./ProgressBar";
import {StageControl} from "./StageControl";
import SelectCategories from "./SelectCategories";
import PersonalData from "./PersonalData";
import UploadFile from "./UploadFile";
import SuccessModal from "./SuccessModal";
import {fetchCategories} from "../../services/calculationService";
import {withUserConsumer} from "../../services/UserContext";
import {readFile, setToIndexedDB} from "../../services/filesService";
import {getContentTranslation} from '../../services/contentService';

class Calculation extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			isShow: false,
			static: {
				header: calcTable.content,
				body: calcHeader.content
			},
			currentStep: 0,
			steps: [SelectCategories, UploadFile, PersonalData, SuccessModal],
			stageActions: {
				firstStep: {
					selectedCategories: [],
					categories: null,
				},
				secondStep: {
					selectedFiles: {},
					ids: new Set(),
				},
				thirdStep: {
					personalData: {
						username: '',
						email: '',
						last_name: '',
						phone: null,
						first_name: ''
					},
				},
			},
		};

		this.toggleModal = this.toggleModal.bind(this);
		this.nextStep = this.nextStep.bind(this);
		this.previousStep = this.previousStep.bind(this);
		this.moveToSelected = this.moveToSelected.bind(this);
		this.moveToAvailableCategories = this.moveToAvailableCategories.bind(this);
		this.initUpload = this.initUpload.bind(this);
		this.setPersonalData = this.setPersonalData.bind(this);
		this.methods = {
			moveToSelected: this.moveToSelected,
			moveToAvailableCategories: this.moveToAvailableCategories,
			initUpload: this.initUpload,
			setPersonalData: this.setPersonalData
		}
	}

	async componentDidMount() {
		this.load();
	}

	componentDidUpdate(prevProps: Readonly<P>) {
		if (prevProps.language !== this.props.language) {
			this.load();
		}
	}

	async load() {
		const bodyContent = getContentTranslation('calculation', this.props.language);
		const headContent = getContentTranslation('calculationHeader', this.props.language);
		const newState = {...this.state}
		newState.static.body = (await bodyContent).content;
		newState.static.header = (await headContent).content
		this.setState(newState);
	}

	toggleModal() {
		if (!this.state.isShow) {
			if (!localStorage.getItem('categories')) {
				fetchCategories().then((res) => {
					const newState = {...this.state};
					localStorage.setItem('categories', JSON.stringify(res));
					newState.stageActions.firstStep.categories = res;
					this.setState(newState);
				}).catch((err) => {
					throw err
				})
			} else {
				const newState = {...this.state};
				newState.stageActions.firstStep.categories = JSON.parse(localStorage.getItem('categories'))
				this.setState(newState);
			}

		}
		this.setState({isShow: !this.state.isShow})
		//TODO - uncomment this
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
		const categories = [...newState.stageActions.firstStep.categories];
		categories.forEach((item, index, array) => {
			if (item.id === category.id) array.splice(index, 1)
			else return item
		});
		newState.stageActions.firstStep.categories = categories;
		this.setState(newState)
	}

	moveToAvailableCategories(category) {
		const newState = {...this.state};
		const categories = this.state.stageActions.firstStep.categories;
		newState.stageActions.firstStep.categories = [...categories, category];
		newState.stageActions.firstStep.selectedCategories.map((item, index, array) => {
			if (item.id === category.id) array.splice(index, 1)
			else return item
		});
		this.setState(newState)
	}

	setPersonalData(personalData) {
		const newState = {...this.state};
		newState.stageActions.thirdStep.personalData = personalData;
		this.setState(newState);
	}

	createRandomUserId(min, max) {
		return Math.floor(Math.random() * (max - min) + min)
	}

	initUpload(input, categoryType) {
		const userId = this.checkCustomer();
		setToIndexedDB(input, userId).then(([map]) => {
			console.log('map', map)
			const selectedFiles = [];
			let resultMap;
			if (map.status === 'fulfilled') {
				resultMap = map.value;
			} else {
				resultMap = map.reason;
			}
			const addedFiles = Array.from(resultMap.get('success'));
			selectedFiles.push(...addedFiles);
			const promiseAll = [];
			if (resultMap.get('failed').size) {
				for (let failed of resultMap.get('failed')) {
					promiseAll.push(readFile(failed))
				}
			}
			Promise.all(promiseAll).then((value) => {
				console.log('value', value);
				selectedFiles.push(...value);
				console.log('result', selectedFiles)
			}).finally(() => {
				const newState = {...this.state};
				const currentFiles = {...newState.stageActions.secondStep.selectedFiles};
				if (categoryType in currentFiles) {
					currentFiles[categoryType] = [...currentFiles[categoryType], ...selectedFiles]
				} else {
					currentFiles[categoryType] = [...selectedFiles];
				}
				newState.stageActions.secondStep.selectedFiles = currentFiles;
				this.setState(newState);
			});
		});
	}

	checkCustomer() {
		const {user} = this.props;
		return user && user.userId || this.createRandomUserId(10e5, 10e6);
	}

	render() {
		return (
			<>
				<Screen page={this.state.static.header}/>
				<UploadButton toggleModal={this.toggleModal}/>
				<Screen page={this.state.static.body}/>
				<ModalContainer isShow={this.state.isShow} toggleModal={this.toggleModal}>
					<ProgressBar currentStep={this.state.currentStep} steps={this.state.steps}/>
					<StageControl randomUserId={this.createRandomUserId} steps={this.state.steps}
								  currentStep={this.state.currentStep} methods={this.methods}
								  nextStep={this.nextStep}
								  previousStep={this.previousStep} stageActions={this.state.stageActions}/>
				</ModalContainer>
			</>
		)
	}
}

export default withUserConsumer(Calculation)

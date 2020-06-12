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
import UploadFile from "./UploadFile/UploadFile";
import SuccessModal from "./DataProcess";
import {fetchCategories} from "../../services/calculationService";
import {withUserConsumer} from "../../services/UserContext";
import {readFile, readKey, setToIndexedDB} from '../../services/filesService';
import {getContentTranslation} from '../../services/contentService';
import IndexedDB from '../../services/indexedDB'

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
		this.setPersonalData=this.setPersonalData.bind(this);
        this.startDataProcess=this.startDataProcess.bind(this);
		this.initUpload = this.initUpload.bind(this);
		this.setPersonalData = this.setPersonalData.bind(this);
		this.removeFileFromState = this.removeFileFromState.bind(this);
		this.addFileClick = this.addFileClick.bind(this);
		this.methods = {
			moveToSelected: this.moveToSelected,
			moveToAvailableCategories: this.moveToAvailableCategories,
			initUpload: this.initUpload,
			setPersonalData: this.setPersonalData,
            startDataProcess: this.startDataProcess,
            removeFileFromState: this.removeFileFromState,
            addFileClick: this.addFileClick,
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
					promiseAll.push(readKey(failed));
				}
			}
			Promise.all(promiseAll).then((value) => {
				selectedFiles.push(...value);
                const newState = {...this.state};
                const tempIds = newState.stageActions.secondStep.ids;
                selectedFiles.forEach((item)=>{
                    tempIds.add(item.id)
                });
                this.setState(newState)
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

    removeFileFromState(fileId, categoryType) {
        console.log('fileId',fileId);
        const newState = {...this.state}
        const collectionIds = newState.stageActions.secondStep.ids;
        let selectedFiles = newState.stageActions.secondStep.selectedFiles;

        collectionIds.delete(fileId);
        newState.stageActions.secondStep.selectedFiles[categoryType] = selectedFiles[categoryType].filter((item) => {
            return item.id !== fileId
        })
        this.setState(newState)
    }

    addFileClick(id, fileName, categoryType) {
	    const newState = {...this.state};
	    const selectedFiles = newState.stageActions.secondStep.selectedFiles;
	    if(selectedFiles[categoryType]){
	        selectedFiles[categoryType].push({id: id, fileName: fileName})
        } else {
            selectedFiles[categoryType] = [];
            selectedFiles[categoryType].push({id: id, fileName: fileName})
        }

	    const ids = newState.stageActions.secondStep.ids;
	    ids.add(id);
	    this.setState(newState)
    }

    startDataProcess(ids){
        const newState = {...this.state};
        const selectedFiles = newState.stageActions.secondStep.selectedFiles;
        let personalData = newState.stageActions.thirdStep.personalData;

        const formData = new FormData();
        const entries = Object.entries(selectedFiles);
        let totalFiles = {};
        for(let [key, value] of entries) {
            totalFiles[key] = value.map((file) => {
                return file.id
            })
        }

       // personalData = JSON.stringify(personalData);
        totalFiles = JSON.stringify(totalFiles);

        formData.append('categories', totalFiles);
        formData.append('personalData[email]', personalData.email);
        formData.append('personalData[first_name]', personalData.first_name);
        formData.append('personalData[last_name]', personalData.last_name);
        formData.append('personalData[phone]', personalData.phone);
        formData.append('personalData[username]', personalData.username);

        readFile(ids)
            .then((value) => {
            value.forEach((file) => {
                const content = file.content;
                const typedArray = new Uint8Array(content);
                for (let i = 0; i < content.length; i++) {
                    typedArray[i] = content.charCodeAt(i);
                }
                const newFile = new File([typedArray], `${file.name}`, );
                formData.append(`id_${file.id}`, newFile, `${file.name}`);
            })
        })
            .finally(() => {
                const request = new XMLHttpRequest();
                request.open("POST", "/api/order");
                request.setRequestHeader('Authorization', 'Bearer WVhCcFFHbHY=')
                request.send(formData);
            });
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

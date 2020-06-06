import React from "react";
import styles from "./uploadFile.module.scss";
import {translate} from "../../func.list";
import {withTranslationConsumer} from "../../services/LanguageContext";
import Button from "../../commonComponents/Button/Button";

function CategoryBtn(props) {
	return (
		<>
			<div className={styles['category-btn']}>
				<Button small text={props.name} onClick={() => {
				}} className={styles.multiselect}/>
			</div>
		</>
	)
}

function CollectionUploadedFilesBtn(props) {
	return (
		<>
			<div className={styles['collection-uploaded-files-btn']}>
				<Button small text='some' onClick={() => {
				}} className={styles.multiselect}/>
			</div>
		</>
	)
}

function OpenEditorBtn(props) {
	return (
		<>
			<div className={styles['open-editor-btn']}>
				<Button small text='Open editor' onClick={() => {
				}} /*className={styles}*//>
			</div>
		</>
	)
}

function UploadFileBtn({onUpload}) {
	const input = React.createRef();
	return (
		<>
			<div className={styles['upload-file-btn']}>
				<input type="file" id="input" multiple ref={input} onChange={() => onUpload(input)}
					   className={styles['input-file']}/>
				<Button small text='Upload file' onClick={() => input.current.click()} /*className={styles}*//>
			</div>
		</>
	)
}

function AlreadyUploadedBtn(props) {
	return (
		<>
			<div className={styles['already-uploaded-btn']}>
				<Button small text='Already uploaded' onClick={() => {
				}} /*className={styles}*//>
			</div>
		</>
	)
}

function UploadFile({translation, methods: {checkCustomer}, stageActions: {firstStep: {selectedCategories, categories}}}) {
	return (
		<>
			<div className={styles.title}>{translate(translation, 'calculation_section.upload_file')}</div>
			<div>
				{selectedCategories && selectedCategories.map((category) => {
					return (
						<div key={category.id} className={styles['category-container']}>
							<CategoryBtn name={category.name} id={category.id}/>
							<CollectionUploadedFilesBtn/>
							<OpenEditorBtn/>
							<UploadFileBtn onUpload={checkCustomer}/>
							<AlreadyUploadedBtn/>
						</div>
					)
				})}

			</div>
		</>
	)

}

export default withTranslationConsumer(UploadFile)
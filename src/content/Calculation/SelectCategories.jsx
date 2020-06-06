import React from "react";
import styles from './selectCategories.module.scss'
import Button from "../../commonComponents/Button/Button";
import {withTranslationConsumer} from "../../services/LanguageContext";
import {translate} from "../../func.list";

function MoveToSelected(props) {
	return <Button small text={props.name} onClick={() => props.moveToSelected(props.category)}
				   className={styles.multiselect}/>;
}

function MoveToAvailableCategories(props) {
	return <Button small text={props.name} onClick={() => props.onSelect(props.category)}
				   className={styles.multiselect}/>;
}

function SelectCategories({stageActions: {firstStep: {selectedCategories, categories}}, methods: {moveToSelected, moveToAvailableCategories}, translation}) {

	return (
		<>
			<div className={styles.title}>{translate(translation, 'calculation_section.select_categories')}</div>
			<div className={styles['select-categories-container']}>
				<div className={styles['block-left']}>
					<div className={styles['category-container']}>Available categories:</div>
					{categories && categories.map((category) => {
						return <MoveToSelected key={category.id} name={category.name} id={category.id}
											   moveToSelected={moveToSelected}
											   category={category}/>


					})}
				</div>
				<div className={styles['block-right']}>
					<div className={styles['category-container']}>Selected categories:</div>
					{selectedCategories && selectedCategories.map((category) => {
						return <MoveToAvailableCategories key={category.id} name={category.name} id={category.id}
														  onSelect={moveToAvailableCategories} category={category}/>
					})}
				</div>
			</div>

		</>
	)
}

export default withTranslationConsumer(SelectCategories)
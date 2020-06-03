import React from "react";
import styles from './selectCategories.module.scss'
import Button from "../../commonComponents/Button/Button";

function MoveToSelected(props) {
	return <Button small text={props.name} onClick={() => props.moveToSelected(props.category)}
				   className={styles.multiselect}/>;
}

function MoveToAvailableCategories(props) {
	return <Button small text={props.name} onClick={() => props.onSelect(props.category)}
				   className={styles.multiselect}/>;
}

function SelectCategories({stageActions: {firstStep: {selectedCategories, categories}}, methods: {moveToSelected, moveToAvailableCategories}}) {

	return (
		<>
			<div className={styles['select-categories-container']}>
				<div className={styles['block-left']}>
					<div className={styles['category-container']}>Available categories:</div>
					{categories && categories.map((category) => {
						return <MoveToSelected name={category.name} id={category.id} moveToSelected={moveToSelected}
											   category={category}/>


					})}
				</div>
				<div className={styles['block-right']}>
					<div className={styles['category-container']}>Selected categories:</div>
					{selectedCategories && selectedCategories.map((category) => {
						return <MoveToAvailableCategories name={category.name} id={category.id}
														  onSelect={moveToAvailableCategories} category={category}/>
					})}
				</div>
			</div>

		</>
	)
}

export {SelectCategories}
import React from "react";
import styles from './selectCategories.module.scss'


function SelectCategories(props) {
	return (
		<>
			<div className={styles['select-categories-container']}>
				<div className={styles['block-left']}>
					Available categories:
				</div>
				<div className={styles['block-right']}>
					Selected categories:
				</div>

			</div>

		</>
	)
}

export {SelectCategories}
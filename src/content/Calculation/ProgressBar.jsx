import React from "react";
import styles from './progressBar.module.scss'
import classNames from 'classnames'

export const ProgressBar = ({currentStep, steps}) => {
	let err;
	if (currentStep > (steps.length - 1) || (currentStep < 0)) {
		err = 'Something is wrong';
	}

	return (!err ?
			<div className={styles.align}>
				<div className={styles['progress-bar-container']}>
					<div className={classNames(styles.bar, styles[`step-${currentStep}`])}/>

				</div>
			</div>
			: <></>
	)
}
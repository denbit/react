import React from "react";
import Button from "../../commonComponents/Button/Button";
import styles from './stageControl.module.scss'
import classNames from 'classnames'

function PreviousButton({text, onClick}) {
	return (
		<div className={styles['button-left']}>
			<Button text={text} onClick={onClick}/>
		</div>
	)
}

function NextButton({text, onClick}) {
	return (
		<div className={styles['button-right']}>
			<Button text={text} onClick={onClick} className={styles.bg}/>
		</div>
	)
}

export function StageControl({currentStep, steps, nextStep, previousStep, stageActions, methods}) {
	let err;
	if (currentStep > (steps.length - 1) || (currentStep < 0)) {
		err = 'Something is wrong';
	}
	const CurrentComponent = steps[currentStep];
	const onlyLeft = (currentStep !== 0) && (currentStep !== steps.length - 1);
	const onlyRight = currentStep !== steps.length - 1;
	return (!err ?
		<div>
			<CurrentComponent stageActions={stageActions} methods={methods}/>
			<div className={classNames(styles['buttons-container'], {
				[styles['only-left']]: onlyLeft && !onlyRight,
				[styles['only-right']]: onlyRight && !onlyLeft
			})}>
				{onlyLeft && <PreviousButton text='Previous' onClick={previousStep}/>}
				{onlyRight && <NextButton text='Next' onClick={nextStep}/>}
			</div>

		</div> : err)
}

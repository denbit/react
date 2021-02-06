import React from "react";
import Button from "../../commonComponents/Button/Button";


export function StageControl({currentStep, steps, nextStep, previousStep}) {
	let err;
	if (currentStep > (steps.length - 1) || (currentStep < 0)) {
		err = 'Something is wrong';
	}
	const CurrentComponent = steps[currentStep];
	return (!err ?
		<div>
			<CurrentComponent/>
			{(currentStep !== 0) && (currentStep !== steps.length - 1) &&
			<Button text='Previous' onClick={previousStep}/>}
			{currentStep !== steps.length - 1 && <Button text='Next' onClick={nextStep}/>}
		</div> : err)
}
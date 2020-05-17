import React, {Component} from "react";
import * as calcHeader from '../calculationHeader.html'
import * as calcTable from '../calculation_en.html.json'
import Screen from "./Screen";
import UploadFile from './UploadFile/UploadFile'

export class Calculation extends Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<>
				<Screen page={calcHeader.content}/>
				<UploadFile/>
				<Screen page={calcTable.content}/>

			</>
		)
	}
}

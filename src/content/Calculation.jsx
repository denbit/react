import React, {Component} from "react";
import * as calcHeader from '../calculationHeader.html'
import * as calcTable from '../calculation.html'
import Screen from "./Screen";

export class Calculation extends Component {
	constructor(props, context) {
		super(props, context);

	}

	render() {
		return (
			<>
				<Screen page={calcHeader.content}></Screen>
				<Screen page={calcTable.content}></Screen>
			</>
		)
	}
}
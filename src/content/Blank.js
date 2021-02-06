import {translate} from "../func.list";
import React, {Component} from "react";
import {Language} from '../services/LanguageContext';

class Blank extends Component {
	static defaultProps = {
		text: "default"
	}
	render(){
		return (
			<Language.Consumer>
				{({filler}) => <p className="blank">{translate(filler, this.props.text)}</p>}
			</Language.Consumer>
		)
	}
};
export default Blank

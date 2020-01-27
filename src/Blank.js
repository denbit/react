import {translate} from "./func.list";
import React from "react";
import {Language} from "./App";

const Blank = (props) => {
	return (
		<Language.Consumer>
			{({filler}) => <p className="blank">{translate(filler, props.text)}</p>}
		</Language.Consumer>
	)
};
Blank.defaultProps = {text: "default"};
export default Blank
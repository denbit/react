import React from "react";
import PropTypes from "prop-types";

const Button = (props) => {
    return (<button onClick={props.onClick}>{props.text}</button>)
};

Button.propTypes={
    text: PropTypes.string.isRequired
};
export default Button

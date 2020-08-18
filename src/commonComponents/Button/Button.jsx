import React from "react";
import PropTypes from "prop-types";
import className from 'classnames'
import style from './button.module.scss'

export const Button = (props) => {
    return (<button onClick={props.onClick}
                    className={className(style.container, {[style.small]: props.small}, props.className, props.styled)}>{props.text}</button>)
};
Button.propTypes = {
    text: PropTypes.string.isRequired,
    className: PropTypes.string,
    small: PropTypes.bool,
    styled: PropTypes.oneOfType([PropTypes.array,PropTypes.object,PropTypes.string]),
    onClick: PropTypes.func.isRequired
};
export default Button

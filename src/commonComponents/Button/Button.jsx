import React from "react";
import PropTypes from "prop-types";
import className from 'classnames'
import style from './button.module.scss'

export const Button = (props) => {
    console.log('log', props.styled)
    return (<button onClick={props.onClick}
                    className={className(style.container, {[style.small]: props.small}, props.styled)} >{props.text}</button>)
};
Button.PropTypes = {
    text: PropTypes.string.isRequired,
    styled:PropTypes.string
};
export default Button
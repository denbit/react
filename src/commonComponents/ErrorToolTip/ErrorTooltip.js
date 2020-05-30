import classNames from 'classnames';
import React from 'react';
const tooltipStyle={
    display: 'block'
};
export const ErrorTooptip = ({isShown, message, className}) => <small
    style={tooltipStyle}
    className={classNames(className)}>{isShown ? message : ''}</small>;

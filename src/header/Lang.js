import React from 'react';
import PropTypes from "prop-types";

function Lang(props) {
    return (<div className="lang" onClick={props.switcher}>{props.lang.toLowerCase()}</div>);
}
Lang.propTypes = { switcher: PropTypes.func.isRequired, lang: PropTypes.string.isRequired};
export default Lang
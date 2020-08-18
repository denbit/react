import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import React, {Component} from 'react'

class NavElement extends Component {
    static propTypes = {
        link: PropTypes.string.isRequired,
        text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    };

    render() {
        return (
            <div className="menu_item">
                <Link  to={'/' + this.props.link}>
                    {this.props.text}
                </Link>
            </div>);
    }
}
export default NavElement

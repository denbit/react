import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import React, {Component} from 'react'

class NavElement extends Component {
    static propTypes = {
        link: PropTypes.string.isRequired,
        text: PropTypes.string,
        goTo: PropTypes.func.isRequired
    };

    render() {

        return (
            <div className="menu_item">
                <Link onClick={() => this.props.goTo(this.props.link)} to={'/' + this.props.link}>
                    {this.props.text}
                </Link>
            </div>);
    }
}
export default NavElement

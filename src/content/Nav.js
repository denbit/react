import PropTypes from "prop-types";
import {Language} from "../App";
import NavElement from "./NavElement";
import {translate} from "../func.list";
import React, {Component} from 'react';

class Nav extends Component {
    static propTypes = {
        navigateTo: PropTypes.func.isRequired
    };

    render() {
        const {navigateTo} = this.props;
        return (<nav className="menu">
            <Language.Consumer>
                {language => (
                    <React.Fragment>
                        <NavElement link="about" goTo={navigateTo} text={translate(language, "about")}/>
                        <NavElement link="calculation" goTo={navigateTo} text={translate(language, "calculation")}/>
                        <NavElement link="contacts" goTo={navigateTo} text={translate(language, "contacts")}/>
                    </React.Fragment>)
                }
            </Language.Consumer>
        </nav>);
    }
}

export default Nav
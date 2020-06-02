import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LangPanel from "./LangPanel";
import {goTo} from '../content/Main';
import Title from './Title';

class Header extends Component {

    static propTypes = {
        languageSwitcher: PropTypes.func.isRequired
    };

    render() {
        return (
            <header className="header">
                <Title goTo={goTo} />
                <LangPanel switcher={this.props.languageSwitcher}/>
            </header>
        );
    }
}

export default Header

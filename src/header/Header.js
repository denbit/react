import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LangPanel from "./LangPanel";
import Title from './Title';

class Header extends Component {

    static propTypes = {
        languageSwitcher: PropTypes.func.isRequired
    };

    render() {
        return (
            <header className="header">
                <Title  />
                <LangPanel switcher={this.props.languageSwitcher}/>
            </header>
        );
    }
}

export default Header

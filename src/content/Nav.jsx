import PropTypes from "prop-types";
import NavElement from "./NavElement";
import {translate} from "../func.list";
import React, {Component} from 'react';
import {withUserConsumer} from '../services/UserContext';
import {Language} from '../services/LanguageContext';

class Nav extends Component {
    static propTypes = {
        navigateTo: PropTypes.func.isRequired,
        user: PropTypes.object,
    };

    static defaultProps = {user: null}

    render() {
        const {navigateTo} = this.props;
        return (<nav className="menu">
            <Language.Consumer>
                {language => (
                    <React.Fragment>
                        <NavElement link="about" text={translate(language, "about")}/>
                        <NavElement link="calculation"  text={translate(language, "calculation")}/>
                        <NavElement link="contacts" text={translate(language, "contacts")}/>
                        {!this.props.user
                            ?
                            <NavElement link="profile" text={translate(language, "profile")} />
                            :
                            <NavElement link="login" text={<><span className='login'/>{translate(language, "login")}</>} />
                        }
                    </React.Fragment>)
                }
            </Language.Consumer>
        </nav>);
    }
}

export default withUserConsumer(Nav)

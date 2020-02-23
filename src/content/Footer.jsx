import React, {Component} from 'react';
import PropTypes from 'prop-types';
import style from "../style/Footer.scss"
import Nav from "./Nav";
class Footer extends Component {
    static  propTypes = {
        contactData: PropTypes.object.isRequired,
        info: PropTypes.string,
    };
    static defaultProps = {info:"Info place with additional data"};
    render() {
        return (
            <footer>
               <h3 className="title">{this.props.info}</h3>
                <section className={'data'}>
                    {this.props.contactData.explain}
                </section>
                <Nav navigateTo={this.props.forNav}/>
            </footer>
        );
    }
}

export default Footer;
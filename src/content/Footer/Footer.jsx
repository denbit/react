import React, {Component} from 'react';
import PropTypes from 'prop-types';
import "./footer.scss"
import Nav from "../Nav";
import Copyright from '../../common/Copyright'

class Footer extends Component {
    static  propTypes = {
        contactData: PropTypes.object.isRequired,
        info: PropTypes.string,
        forNav: PropTypes.func.isRequired
    };
    static defaultProps = {info: "Info place with additional data"};

    render() {

        return (
            <footer>
                <h3 className="title">{this.props.info}</h3>
                <section className={'data'}>
                    {this.props.contactData.explain}
                </section>
                <Nav navigateTo={this.props.forNav}/>
                <Copyright/>
            </footer>
        );
    }
}

export default Footer;
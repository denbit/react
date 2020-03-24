import PropTypes from "prop-types";
import {Language} from "../App";
import {translate} from "../func.list";
import React, {Component, Fragment} from 'react';

class Slide extends Component {
    static propTypes ={
        src:PropTypes.string.isRequired,
        text:PropTypes.string.isRequired
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.context !== nextContext;
    }

    render() {
        return (<Fragment>
            <Language.Consumer>
                {({slides}) => {
                    return <div><h3>{translate(slides, this.props.text)}</h3><img alt={this.props.text}
                                                                                  src={this.props.src}/></div>
                }
                }
            </Language.Consumer>
        </Fragment>);
    }
}

export default Slide
import PropTypes from "prop-types";
import React, {Component} from 'react';

class Arrow extends Component {
    static propTypes={
        direction:PropTypes.oneOf(['arrow-prev','arrow-next']),
        ArrowClick:PropTypes.func.isRequired,
        arrowText: PropTypes.string
    };
    static defaultProps ={
        arrowText:''
    };
    render() {
        return (
            <div className={'slick'}>
                <button onClick={(event) => this.props.ArrowClick(event, this.props.direction)}
                        className={'slick-arrow ' + this.props.direction}>{this.props.arrowText}</button>
                <span className={'arrow-center'}></span>
            </div>
        );
    }

}

export default Arrow

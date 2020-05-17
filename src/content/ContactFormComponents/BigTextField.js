import PropTypes from "prop-types";
import styles from "../../style/ContactForm.css";
import classNames from "classnames";
import React, {Component, Fragment} from "react";

class BigTextField extends Component {
    static defaultProps = {
        labelText: "Label for Name",
        name: 'input_name',
        labelClassName: '',
        className: '',
    };
    static propTypes = {
        name: PropTypes.string,
        labelClassName: PropTypes.string,
        labelText: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.change = this.change.bind(this);
        this.state = {value: undefined}
    }

    change(e) {
        this.setState({value: e.target.value})
    }

    render() {
        return <Fragment>
            <div className={styles.line}>
                <label className={this.props.labelClassName} htmlFor={this.props.name}>{this.props.labelText}</label>
                <textarea onChange={this.change} value={this.state.value} name={this.props.name}
                          className={classNames(styles.field, this.props.className)}/>
            </div>
        </Fragment>
    }

}

export default BigTextField
import PropTypes from "prop-types";
import styles from "../../style/ContactForm.css";
import classNames from "classnames";
import React, {Component, Fragment} from "react";

const InputField =(props) => {
    return <input {...props}/>
}

InputField.defaultProps = {
    value: ""
}

class SmallTextField extends Component {
    static defaultProps = {
        labelText: "Label for Name",
        name: 'input_name',
        labelClassName: ''
    };
    static propTypes = {
        name: PropTypes.string,
        labelClassName: PropTypes.string,
        labelText: PropTypes.string,
        placeholder: PropTypes.string,
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
        const placeholder = this.props.placeholder ? {placeholder: ' '.repeat(3) + this.props.placeholder} : {};
        return <Fragment>
            <div className={styles.line}>
                <label className={this.props.labelClassName} htmlFor={this.props.name}>{this.props.labelText}</label>
                <InputField type='text' onChange={this.change} value={this.state.value} name={this.props.name}
                            className={classNames(styles.field, this.props.className)} {...placeholder}/>
            </div>
        </Fragment>
    }
}
export default SmallTextField
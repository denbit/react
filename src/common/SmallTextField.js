import PropTypes from 'prop-types';
import styles from './smallTextField.module.scss';
import classNames from 'classnames';
import React, {Component, Fragment} from 'react';
import {ErrorTooptip} from '../commonComponents/ErrorToolTip/ErrorTooltip';

const InputField =(props) => {
    const inheritedProps={...props};
    if (props.onChange){
        inheritedProps.onChange=(event,...args)=>props.onChange(event, props.value, props.name, args);
    }
    return <input {...inheritedProps} />
}

InputField.defaultProps = {
    value: ""
}

class SmallTextField extends Component {
    static defaultProps = {
        labelText: "Label for Name",
        name: 'input_name',
        labelClassName: '',
        className: '',
        value:null,
        type:"text",
        disabled:false,
        error: false,
        onErrorMessage: ()=>'',
        onChange: null,
    };
    static propTypes = {
        name: PropTypes.string,
        value: PropTypes.any,
        type: PropTypes.oneOf(['text','phone','email','password']),
        onErrorMessage: PropTypes.func,
        onChange: PropTypes.func,
        error: PropTypes.bool,
        labelClassName: PropTypes.string,
        className: PropTypes.string,
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
        const { onErrorMessage, error} = this.props;
        const placeholder = this.props.placeholder ? {placeholder: ' '.repeat(3) + this.props.placeholder} : {};
        return <Fragment>
            <div className={styles.line}>
                <label className={this.props.labelClassName} htmlFor={this.props.name}>{this.props.labelText}</label>
                <InputField disabled={this.props.disabled} type={this.props.type} onChange={this.props.onChange?this.props.onChange:this.change} value={this.props.value?this.props.value:this.state.value} name={this.props.name}
                            readOnly={this.state.readOnly?'readonly':false}
                            className={classNames(styles.field, this.props.className)} {...placeholder}/>
                 <ErrorTooptip isShown={error} message={error?onErrorMessage(this.props.name):''}/>

            </div>
        </Fragment>
    }
}
export default SmallTextField

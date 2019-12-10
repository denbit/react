import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames";

import {Language} from './App';
import styles from "./ContactForm.css";
const loadText = "Loading";
console.log(Language);

function InputField(props) {
	return <input {...props}/>
}
InputField.defaultProps = {
	value: ""
}
const getTranslation = (container, value) =>container &&container[value] || loadText;
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
		const placeholder = this.props.placeholder ? {placeholder: ' '.repeat(3) + this.props.placeholder} :{};
		return <Fragment>
			<div className={styles.line}>
				<label className={this.props.labelClassName} htmlFor={this.props.name}>{this.props.labelText}</label>
				<InputField type='text' onChange={this.change} value={this.state.value} name={this.props.name}
							className={classNames(styles.field, this.props.className) } {...placeholder}/>
			</div>
		</Fragment>
	}

}
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

class ContactForm extends Component {
	render() {
		const {Consumer: Translator} = Language;

		return (
			<Translator>
				{({contact_form}) => {
					console.log(contact_form);
					return (
						<div className={styles.container}>
							<h1 className={styles.title}> {getTranslation(contact_form, 'title')}</h1>
							<SmallTextField name={'email'} className={'mail_fl'} labelClassName={styles.input} placeholder={getTranslation(contact_form, 'email_placeholder')} labelText={getTranslation(contact_form, 'email')}/>
							<SmallTextField name={'name'} labelClassName={styles.input} placeholder={getTranslation(contact_form, 'name_placeholder')} labelText={getTranslation(contact_form, 'name')} />
							<SmallTextField name={'phone'} labelClassName={styles.input} placeholder={getTranslation(contact_form, 'phone_placeholder')} labelText={getTranslation(contact_form, 'name')} />
							<BigTextField name={'message'} labelClassName={styles.input}  labelText={getTranslation(contact_form, 'message')} />
						</div>)
				}}
			</Translator>);
	}
}

export default ContactForm;
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

const getTranslation = (container, value) => (container && container[value]) || loadText;

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

const Button = (props) => {
	return (<button onClick={props.onClick}>{props.text}</button>)
};

class ContactForm extends Component {
	constructor(props) {
		super(props);
		this.state = {sent: true};
		this.form = React.createRef();
		this.send = this.send.bind(this);
	}

	send() {
		fetch("/send_question.c", {body: new FormData(this.form.current), method: 'POST'})
			.then(r => r.json())
			.then(response => {
				this.setState({...response});
			});
	}

	render() {
		const {Consumer: Translator} = Language;
		const withTranslation = <Translator>
			{({contact_form}) => {
				const sent = this.state.sent === undefined ? false : true;
				const formComponent = <Fragment>
					<h1 className={styles.title}> {getTranslation(contact_form, 'title')}</h1>
					<form ref={this.form}>
						<SmallTextField name={'email'} className={'mail_fl'} labelClassName={styles.input}
										placeholder={getTranslation(contact_form, 'email_placeholder')}
										labelText={getTranslation(contact_form, 'email')}/>
						<SmallTextField name={'name'} labelClassName={styles.input}
										placeholder={getTranslation(contact_form, 'name_placeholder')}
										labelText={getTranslation(contact_form, 'name')}/>
						<SmallTextField name={'phone'} labelClassName={styles.input}
										placeholder={getTranslation(contact_form, 'phone_placeholder')}
										labelText={getTranslation(contact_form, 'name')}/>
						<BigTextField name={'message'} labelClassName={styles.input}
									  labelText={getTranslation(contact_form, 'message')}/>
					</form>
					<Button onClick={this.send} text={getTranslation(contact_form, 'send')}/>
				</Fragment>;

				let sentStatus = this.state.sent === false ? "error" : "success";
				const sentComponent = <Fragment>
					<div className={classNames({[`container-${sentStatus}`]: true})}>
						<h1 className={classNames('message')}>Your message
							was{this.state.sent === false ? ' not' : ''} sent.</h1>
						{this.state.sent ? <h3>You will be contacted soon! Thank you for cooperation.</h3> :
							<h3> Please check all fields for correctness and try again.</h3>}
						<span onClick={()=>this.setState({sent:undefined})} style={{textDecoration: 'underline'}}> send another one</span>
					</div>
				</Fragment>;
				console.log(contact_form);
				return (
					<div className={styles.container}>
						{sent ? sentComponent : formComponent}
					</div>)
			}}
		</Translator>

		return (<Fragment>{withTranslation}</Fragment>);
	}
}

export default ContactForm;
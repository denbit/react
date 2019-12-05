import React, {Component, Fragment} from 'react';
import {Language} from './App';
console.log(Language);

function InputField(props) {
	return <input {...props}/>
}
InputField.defaultProps = {
	value: ""
}

class NameField extends Component {
	static defaultProps = {
		labelText: "Label for Name",
		name: 'input_name',
		labelClassName: '',
	}

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
			<div><label className={this.props.labelClassName} htmlFor={this.props.name}>{this.props.labelText}</label>
				<InputField type='text' onChange={this.change} value={this.state.value} name={this.props.name}
							className={this.props.className}/>
			</div>
		</Fragment>
	}

}

class ContactForm extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const {Consumer: Translator} = Language;
		return (
			<Translator>
				{(value) => {
					return (
						<Fragment>
							<h2>Contact form</h2>
							<NameField name={'email'} className={'mail_fl'} labelText={'Enter name please'}/>
						</Fragment>)
				}}
			</Translator>);
	}
}

export default ContactForm;
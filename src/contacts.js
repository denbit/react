import React,{Fragment,Component} from 'react';
import {Language} from './App'
const {Consumer:Translator} = Language;
function InputField(props){
    return <input {...props}/>
}
class NameField extends Component{

    constructor(props) {
        super(props);
        this.change = this.change.bind(this);

    }
    static defaultProps = {
        labelText:"Label for Name",
        name : 'input_name',
        labelClassName:'',

    }
    change(e){

    }
    render() {

        return <Fragment>
            <div><label className={this.props.labelClassName}  htmlFor={this.props.name}>{this.props.labelText}</label>
                <InputField type='text' onChange={this.change} name={this.props.name} className={this.props.className} />
            </div>
        </Fragment>
    }

}
class ContactForm extends Component{
    render() { return (
        <Translator>
            (value)=>{
            <Fragment>
            <h2>Contact form</h2>
            <NameField name={'email'} className={'mail_fl'} labelText={'Enter name please'}></NameField>
            </Fragment>
        }
        </Translator>);
    }
}
export default ContactForm;
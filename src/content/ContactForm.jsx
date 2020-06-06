import React, {Component, Fragment} from 'react';
import classNames from 'classnames';
import styles from '../style/ContactForm.css';
import BigTextField from './ContactFormComponents/BigTextField';
import SmallTextField from '../common/SmallTextField';
import Button from '../commonComponents/Button/Button';
import {translate} from '../func.list';
import {Language} from '../services/LanguageContext';

class ContactForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sent: undefined,
            failed: false,
            validation: undefined,
        };
        this.form = React.createRef();
        this.send = this.send.bind(this);
        this.handleError = this.handleError.bind(this);
        this.email = React.createRef();
        this.phone = React.createRef();
        this.first_name = React.createRef();
    }

    send() {
        fetch('/send_question.c', {
                body: new FormData(this.form.current),
                method: 'POST',
                headers: {'Accept': 'application/json'},
            },
        ).then(r => r.json()).then(response => {
            if (!('errors' in response)) {
                this.setState({...response});
            } else {
                this.setState({failed: true, validation: {...response}});
            }
        }).catch(console.error);

    }

    componentDidMount() {
        const user = this.props.router.location.state;
        if (user) {
            for (let field in user) {
                if (field in this) {
                    console.log(this[field].current.setState({value: user[field], readOnly: true}));
                }
            }

        }
    }

    handleError(field) {
        const {validation, failed} = this.state;
        return failed && validation && (field in validation.errors) ? validation.errors[field] : '';
    }

    render() {
        const {Consumer: Translator} = Language;
        const {failed} = this.state;
        const withTranslation = <Translator>
            {({contact_form}) => {
                const sent = this.state.sent === undefined ? false : true;
                const formComponent = <Fragment>
                    <h1 className={styles.title}> {translate(contact_form,
                        'title')}</h1>
                    <form ref={this.form}>
                        <h2>{failed ? this.state.validation.message : ''}</h2>
                        <SmallTextField ref={this.email} name={'email'}
                                        error={failed}
                                        onErrorMessage={this.handleError}
                                        className={'mail_fl'}
                                        labelClassName={styles.input}
                                        placeholder={translate(contact_form,
                                            'email_placeholder')}
                                        labelText={translate(contact_form,
                                            'email')}/>
                        <SmallTextField ref={this.first_name} name={'name'}
                                        labelClassName={styles.input}
                                        error={failed}
                                        onErrorMessage={this.handleError}
                                        placeholder={translate(contact_form,
                                            'name_placeholder')}
                                        labelText={translate(contact_form,
                                            'name')}/>
                        <SmallTextField ref={this.phone} name={'phone'}
                                        labelClassName={styles.input}
                                        placeholder={translate(contact_form,
                                            'phone_placeholder')}
                                        error={failed}
                                        onErrorMessage={this.handleError}
                                        labelText={translate(contact_form,
                                            'phone')}/>
                        <BigTextField name={'message'}
                                      labelClassName={styles.input}
                                      labelText={translate(contact_form,
                                          'message')}/>
                    </form>
                    <Button onClick={this.send}
                            text={translate(contact_form, 'send')}/>
                </Fragment>;

                let sentStatus = this.state.sent === false ?
                    'error' :
                    'success';
                const sentComponent = <Fragment>
                    <div className={classNames(
                        {[`container-${sentStatus}`]: true})}>
                        <h1 className={classNames('message')}>Your message
                            was{this.state.sent === false ?
                                ' not' :
                                ''} sent.</h1>
                        {this.state.sent ?
                            <h3>You will be contacted soon! Thank you for
                                cooperation.</h3> :
                            <h3> Please check all fields for correctness and try
                                again.</h3>}
                        <span onClick={() => this.setState({sent: undefined})}
                              style={{textDecoration: 'underline'}}> send another one</span>
                    </div>
                </Fragment>;
                console.log(contact_form);
                return (
                    <div className={styles.container}>
                        {sent ? sentComponent : formComponent}
                    </div>);
            }}
        </Translator>;

        return (<Fragment>{withTranslation}</Fragment>);
    }
}

export default ContactForm;

import React, {Component, Fragment} from 'react';
import classNames from 'classnames';
import {Language} from '../App';
import styles from '../style/ContactForm.module.scss';
import BigTextField from './ContactFormComponents/BigTextField';
import SmallTextField from './ContactFormComponents/SmallTextField';
import Button from '../commonComponents/Button/Button';
import {translate} from '../func.list';

class ContactForm extends Component {
    constructor(props) {
        super(props);
        console.log(styles);
        this.state = {
            sent: undefined,
            failed: false,
            validation: undefined,
        };
        this.form = React.createRef();
        this.send = this.send.bind(this);
        this.handleError = this.handleError.bind(this);
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

    handleError(field) {
        const {validation, failed} = this.state;
        console.log(field, validation,
            failed && validation && (field in validation.errors));
        return failed && validation && (field in validation.errors) ?
            validation.errors[field] :
            '';
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
                        <SmallTextField name={'email'}
                                        error={failed}
                                        onErrorMessage={this.handleError}
                                        className={'mail_fl'}
                                        labelClassName={styles.input}
                                        placeholder={translate(contact_form,
                                            'email_placeholder')}
                                        labelText={translate(contact_form,
                                            'email')}/>
                        <SmallTextField name={'name'}
                                        labelClassName={styles.input}
                                        error={failed}
                                        onErrorMessage={this.handleError}
                                        placeholder={translate(contact_form,
                                            'name_placeholder')}
                                        labelText={translate(contact_form,
                                            'name')}/>
                        <SmallTextField name={'phone'}
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

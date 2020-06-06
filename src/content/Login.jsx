import React, {Component, Fragment} from 'react';
import classNames from 'classnames';
import styles from '../style/ContactForm.css';
import SmallTextField from './ContactFormComponents/SmallTextField';
import Button from '../commonComponents/Button/Button';
import {translate} from '../func.list';
import {withTranslationConsumer} from '../services/LanguageContext';
import {withRouter} from 'react-router-dom';
import {updateUser} from '../services/UserContext';
import UserService from '../services/userService';


class Login extends Component {
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
        this.username = React.createRef();
        this.password = React.createRef();

    }

    send() {
        UserService.instance().login(this.form.current)
        .then(response => {
            console.log('Login response', response);
            this.setState({user:response});
           this.props.history.push('/');
        })
        .catch(error => {
                if ('errors' in error) {
                    this.setState({...this.state,failed: true, validation: {...error}})
                    console.log(error)
                } else  {
                  //  console.log(error)
                    this.setState({...this.state, failed: true});
                }
        });

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
        const {failed} = this.state;
        const {translation} = this.props;

        return (
            <div className={styles.container}>
                {<Fragment>
                    <h1 className={styles.title}>
                        {translate(translation, 'login_component.title')}
                    </h1>
                    <form ref={this.form}>
                        <h2>{failed ?(this.state.validation && this.state.validation.message)||'Something went wrong' : ''}</h2>
                        <SmallTextField ref={this.username} name={'username'}
                                        error={failed}

                                        onErrorMessage={this.handleError}
                                        className={'mail_fl'}
                                        labelClassName={styles.input}
                                        placeholder={translate(translation,
                                            'login_component.username_placeholder')}
                                        labelText={translate(translation,
                                            'login_component.username')}/>
                        <SmallTextField ref={this.password} name={'password'}
                                        labelClassName={styles.input}
                                        error={failed}
                                        type="password"
                                        onErrorMessage={this.handleError}
                                        labelText={translate(translation,
                                            'login_component.password')}/>
                    </form>
                    <Button onClick={this.send}
                            text={translate(translation, 'login_component.login')}/>
                </Fragment>}
            </div>);

    }
}

export default withTranslationConsumer(withRouter(Login));

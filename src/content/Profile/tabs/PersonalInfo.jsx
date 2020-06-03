import React from 'react';
import SmallTextField from '../../ContactFormComponents/SmallTextField';
import Button from '../../../commonComponents/Button/Button';
import style from './personalInfo.module.scss'
import {withTranslationConsumer} from '../../../services/LanguageContext';
import {translate} from '../../../func.list';
import {updateUser} from '../../../services/UserContext';

class PersonalInfo extends React.Component {

    static propTypes = {};
    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            edit:false,
            user:{...this.props.user},
        };
        this.handleChange=this.handleChange.bind(this);
        this.handleSave=this.handleSave.bind(this);

    }

    handleChange(e,prevValue,name){
        const state = {...this.state};
        console.log(prevValue,name,e.target.value);
        state.user[name]=e.target.value;
         this.setState(state);
    }
    handleSave(){
        const edit =this.state.edit;
        if (edit){
            updateUser(this.state.user)
        }
        this.setState({edit:!edit});
    }
    render() {
        const {edit, user} = this.state
        const {translation} = this.props;
        return <>
            <section>
                <div className={style.edit_button_wrapper}>
                    <Button
                        small
                        text={!edit? translate(translation,'edit'):translate(translation,'save')}
                        styled={style['edit_btn']}
                        onClick={this.handleSave}
                />
                </div>
                <div className={style.id_label}>
                    <h2>{translate(translation,'personal_info.personal_title')}</h2>
                </div>
                <hr/>
                <div className={style.input_group}>
                    <SmallTextField disabled={!edit} name="username"
                                    onChange={this.handleChange}
                                    className={style.personalField} value={user.username} labelClassName={style.personalLabel} labelText={'Username'}
                                    placeholder="Your username"/>
                    <SmallTextField disabled={!edit}  name="email"
                                    onChange={this.handleChange}
                                    className={style.personalField}
                                    value={user.email}
                                    labelClassName={style.personalLabel}
                                    labelText={'Email'}
                                    placeholder="Your email"/>
                    <SmallTextField disabled={!edit} name="phone"
                                    onChange={this.handleChange}
                                    className={style.personalField}
                                    value={user.phone} labelText={'Phone'}
                                    labelClassName={style.personalLabel}
                                    placeholder="Your phone"/>
                    <SmallTextField disabled={!edit} name="first_name"
                                    onChange={this.handleChange}
                                    className={style.personalField}
                                    value={user.first_name}
                                    labelClassName={style.personalLabel}
                                    labelText={'First name'}
                                    placeholder="Your first name"/>
                    <SmallTextField disabled={!edit} name="last_name"
                                    onChange={this.handleChange}
                                    className={style.personalField}
                                    value={user.last_name} labelText={'Last name'}
                                    labelClassName={style.personalLabel}
                                    placeholder="Your last name"/>
                </div>
            </section>
        </>;
    }
}

export default withTranslationConsumer(PersonalInfo);

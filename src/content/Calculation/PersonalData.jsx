import React from 'react';
import SmallTextField from '../../common/SmallTextField';
import Button from '../../commonComponents/Button/Button';
import style from './personalData.module.scss'
import tabStyle from './tabs.module.scss'
import {withTranslationConsumer} from '../../services/LanguageContext';
import {translate} from '../../func.list';
import {withUserConsumer} from '../../services/UserContext';


class PersonalData extends React.Component {

    static propTypes = {};
    static defaultProps = {
        user:null
    };

    constructor(props) {
        super(props);
        this.state = {
            edit:!this.props.user,
        };
        this.handleChange=this.handleChange.bind(this);
        ({methods:{setPersonalData:this.setPersonalData}} =this.props)
    }

    componentDidMount() {
       if (this.props.user)
           this.setPersonalData({...this.props.user});
    }

    handleChange(e,prevValue,name){
        const {stageActions:{thirdStep:{personalData:userData}}} = this.props;
        const user={...userData};
        console.log(prevValue,name,e.target.value);
        user[name]=e.target.value;
        this.setPersonalData(user);
    }

    render() {
        const {edit} = this.state
        const {translation,stageActions:{thirdStep:{personalData:user}}} = this.props;
        console.log(user);
        return (
            <section>
                <div className={style.lock_button_wrapper}>
                    {!edit&&<Button
                        small
                        text={''}
                        styled={style['locked_btn']}
                />}
                </div>
                <div className={tabStyle.id_label}>
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
            </section>);
    }
}

export default withTranslationConsumer(withUserConsumer(PersonalData));

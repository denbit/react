import React from 'react';
import {
    Link,
    HashRouter,
    Route,
    Switch,
} from 'react-router-dom';
import {withUserConsumer} from '../../services/UserContext';
import {withTranslationConsumer} from '../../services/LanguageContext';
import OldOrders from './tabs/OldOrders';
import PersonalInfo from './tabs/PersonalInfo';
import Orders from './tabs/Orders';
import {translate} from '../../func.list';
import style from './Profile.module.scss';


import TabLink from './tabs/TabLink';

const ProfileWrapper = (props) =>
    <HashRouter>
        <Profile {...props}/>
    </HashRouter>;

class Profile extends React.Component {
    static state = {};
    static propTypes = {};

    constructor(props) {
        super(props);

    }

    drawTabs(){
        console.log(style);
        return (
            <header className={style['profile-header']}>
                <h2>{translate(this.props.translation, "profile")}</h2>
                <div style={style['tab-links__wrapper']}>
                    <TabLink to="/old-orders">{translate(this.props.translation.profile_component,'old_orders')}</TabLink>
                    <TabLink to="/personal">{translate(this.props.translation.profile_component,'personal_info')}</TabLink>
                    <TabLink to="/orders">{translate(this.props.translation.profile_component,'orders')}</TabLink>
                    <TabLink to="/calculation" router={this.props.router} isParent>Upload new files</TabLink>
                    <TabLink to="/contacts" router={this.props.router} isParent>{translate(this.props.translation, "contacts")}</TabLink>
                </div>

            </header>)
    }
    render() {
        return (<div>
            {this.drawTabs()}
            <Switch>
            <Route path={'/old-orders'} component={OldOrders} />
            <Route path={'/personal'} component={PersonalInfo}/>
            <Route path={'/orders'}  component={Orders}/>
             <Route component={PersonalInfo}/>

            link to upload new files

            link to contact form with filled in

        </Switch>
        </div>);
    }
}

export default withTranslationConsumer(withUserConsumer(ProfileWrapper));

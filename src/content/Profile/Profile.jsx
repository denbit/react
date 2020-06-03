import React from 'react';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import OldOrders from './tabs/OldOrders';
import PersonalInfo from './tabs/PersonalInfo';
import Orders from './tabs/Orders';
import {translate} from '../../func.list';
import style from './Profile.module.scss';
import TabLink from './tabs/TabLink';

class Profile extends React.Component {
    static state = {};
    static propTypes = {};

    constructor(props) {
        super(props);

    }

    drawTabs() {
        console.log(style);
        const {translation} = this.props.own;
        return (
            <header className={style['profile-header']}>
                <h2>{translate(translation, 'profile')}</h2>
                <div className={style['tab-links__wrapper']}>
                    <TabLink to="/personal"
                             isActive={this.props.location.pathname ===
                             '/personal'}>{translate(
                        translation.profile_component,
                        'personal_info')}</TabLink>
                    <TabLink to="/old-orders"
                             isActive={this.props.location.pathname ===
                             '/old-orders'}>{translate(
                        translation.profile_component,
                        'old_orders')}</TabLink>

                    <TabLink to="/orders"
                             isActive={this.props.location.pathname ===
                             '/orders'}>{translate(
                        translation.profile_component,
                        'orders')}</TabLink>
                    <TabLink to="/calculation"
                             isActive={this.props.own.path === '/calculation'}
                             router={this.props.own.router} isParent>{translate(translation,'profile_component.upload_files')}</TabLink>
                    <TabLink to="/contacts" data={this.props.own.user}
                             isActive={this.props.own.path === '/contacts'}
                             router={this.props.own.router} isParent>{translate(
                        translation, 'contacts')}</TabLink>
                </div>

            </header>);
    }

    render() {
        return (<div>
            {this.drawTabs()}
            <Switch>
                <Route path={'/personal'} >
                    <PersonalInfo user={this.props.own.user}/>
                </Route>
                <Route path={'/old-orders'} component={OldOrders}/>
                <Route path={'/orders'} component={Orders}/>
                <Route>
                    <Redirect to={'/personal'}/>
                </Route>

                link to upload new files

                link to contact form with filled in

            </Switch>
        </div>);
    }
}

export default withRouter(Profile);

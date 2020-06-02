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
import NavElement from '../NavElement';
import Button from '../../commonComponents/Button/Button';

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
        return (<>
            <Link to="/old-orders">{translate(this.props.translation.profile_component,'old_orders')}</Link>
            <Link to="/personal">{translate(this.props.translation.profile_component,'personal_info')}</Link>
            <Link to="/orders">{translate(this.props.translation.profile_component,'orders')}</Link>
            <Link  to={"calculation"}>Cls</Link>
            <Button text={'Contactme'} onClick={()=>this.props.router.push("/contacts")}/>
            </>)
    }
    render() {
        return (<div>
            {this.drawTabs()}
            <Switch>
            <Route path={'/old-orders'} component={OldOrders} />
            <Route path={'/personal'} component={PersonalInfo}/>
            <Route path={'/order'}  component={Orders}/>
             <Route component={PersonalInfo}/>

            link to upload new files

            link to contact form with filled in

        </Switch>
        </div>);
    }
}

export default withTranslationConsumer(withUserConsumer(ProfileWrapper));

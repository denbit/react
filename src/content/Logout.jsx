import React from 'react';
import {Redirect} from 'react-router-dom';
import UserService from '../services/userService';

function Logout(props) {
    let logedOut=false;
    UserService.instance().removeUserData().then(()=>logedOut=true);
    return <>{logedOut&&<Redirect to={"/"}/>}</>;
}

Logout.defaultProps = {}


export default Logout;

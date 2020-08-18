import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import UserService from '../services/userService';
import {withUserConsumer} from '../services/UserContext';

function Logout({user}) {
    const [loggedOut, setLoggedOut] = useState(false);
    useEffect(() => {
        if (user) {
            UserService.instance().removeUserData().then((r) => {
                console.log(r);
                setLoggedOut(true);
            });
        }
    },[]);

    return <>{loggedOut && <Redirect to={'/'}/>}</>;
}

Logout.defaultProps = {};

export default withUserConsumer(Logout);

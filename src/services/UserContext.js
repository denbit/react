// @flow
import React,{useEffect, useState} from 'react';
import UserService from './userService';

const {Provider: UserProvider, Consumer: UserConsumer} = React.createContext(null);
const userService = new UserService();
export function withUserProvider(Component) {
    return () => {
        const [user, setUser] = useState({});
        UserService.setUserInState=setUser;
        useEffect(() =>userService.placeUserInState(), []);
        return <UserProvider value={user}><Component/></UserProvider>;
    };
}

export function withUserConsumer(Component) {

    return (props) => <UserConsumer>
        {value => (value !== null ? (<Component user={value} {...props}/>) : <Component {...props}/>)}
    </UserConsumer>;
}

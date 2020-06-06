// @flow
import * as React from 'react';
import {useEffect, useState} from 'react';

type User = {
    username: string,
    id: number,
    email: string,
    last_name: string,
    phone: string,
    first_name: string
}
let currentUser: User = null;//{username: 'lalfaf', id: 2, email:'mal@mail',last_name:"ivo",phone:5155,first_name:'bobuli'};
let set;

function getUserFromServer() {
    const u = {username: 'lalfaf', id: 2, email: 'mal@mail', last_name: 'ivo', phone: 5155, first_name: 'bobuli'};
    updateUser(u);
    return u;
}

function init() {
    if (window.api_key && !currentUser) {
        currentUser = getUserFromServer();
    }
    // if (!window.api_key && currentUser){
    //     localStorage.removeItem('user');
    // }


}

const getUser = (...arg): User => {
    console.info('i was inited');
    init();
    if (arg.length === 1) {
        set = arg[0];
    }
    currentUser = currentUser || JSON.parse(localStorage.getItem('user'));
    if (set) {
        set(currentUser);
    }
    return currentUser;
};

const {Provider: UserProvider, Consumer: UserConsumer} = React.createContext(
    getUser());

export function withUserProvider(Component) {
    return () => {
        const [user, setUser] = useState(currentUser);
        useEffect(() => {
            getUser(setUser)
        }, []);
        return <UserProvider value={user}><Component/></UserProvider>;
    };
}

export function withUserConsumer(Component) {

    return (props) => <UserConsumer>
        {value => (value !== null ? (<Component user={value} {...props}/>) : <Component {...props}/>)}
    </UserConsumer>;
}

export function updateUser(user: User): boolean {
    localStorage.setItem('user', JSON.stringify(user));
    currentUser = user;
    console.log(getUser());
    //make request to back
    return true;
}

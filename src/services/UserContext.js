// @flow
import * as React from 'react';
type User = {
    username: string,
    id: number,
    email: string,
    last_name: string,
    phone: string,
    first_name: string
}
const initValue = null;
let currentUser:User = {username: 'lalfaf', id: 2, email:'mal@mail',last_name:"ivo",phone:5155,first_name:'bobuli'};
const getUser = (): User => (currentUser);
const {Provider: UserProvider, Consumer: UserConsumer} = React.createContext(
    initValue);

export function withUserProvider(Component) {

    return () => <UserProvider value={currentUser}><Component/></UserProvider>;
}

export function withUserConsumer(Component) {

    return (props) => <UserConsumer>
        {value => (value !== null ? (<Component user={value} {...props}/>) : <Component {...props}/>)}
    </UserConsumer>;
}
export function updateUser(user:User):boolean {
    currentUser={...user};
    console.log(getUser());
    //make request to back
    return true
}

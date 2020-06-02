import * as React from 'react';

const initValue = null;
const getUser = () => ({a: 1, b: 2});
const {Provider: UserProvider, Consumer: UserConsumer} = React.createContext(
    initValue);

export function withUserProvider(Component) {
    const user = getUser();
    return () => <UserProvider value={user}><Component/></UserProvider>;
}

export function withUserConsumer(Component) {

    return (props) => <UserConsumer>
        {value => (value !== null ? (<Component user={value} {...props}/>) : <Component {...props}/>)}
    </UserConsumer>;
}

// @flow
import {DEFAULT_DOMAIN} from "../config";

type User = {
    username: string,
    id: number,
    email: string,
    last_name: string,
    phone: string,
    first_name: string
}
type State = {};

export default class UserService {
    static profileURL = new URL(DEFAULT_DOMAIN +'/user/profile');
    static userService: UserService;
    currentUser: User = null;
    static setUserInState;

    static instance(): UserService {
        return UserService.userService;
    }

    static getUserFromLocalStorage(): User | null {
        return JSON.parse(localStorage.getItem('user'));
    }

    constructor(setUser: Function = null) {
        UserService.userService = this;
        UserService.setUserInState = setUser || UserService.setUserInState;
        if (window.api_key && !this.currentUser) {
            this._setKey();
            console.info('i was inited');
            this.currentUser = UserService.getUserFromLocalStorage();
            this.currentUser || this.fetchUser().then(response => {
                this.currentUser = response;
                this.putUserToLocalStorage(this.currentUser);
                this.placeUserInState();
            });
        }
        if (!window.api_key && this.currentUser) {
            localStorage.removeItem('user');
        }
    }

    _setKey() {
        UserService.profileURL.searchParams.set('t', window.api_key);
    }

    putUserToLocalStorage(user: User): User {
        localStorage.setItem('user', JSON.stringify(user));
        return this.currentUser = user;
    }

    removeUserFromLocalStorage() {
        localStorage.removeItem('user');
    }

    fetchUser() {
        return fetch(UserService.profileURL, {
            method: 'GET',
            headers: {'Accept': 'application/json'},
        }).then(r => {
            if (!r.ok) {
                const resp = r.json();
                console.info(r.status, r.statusText, resp);
                return Promise.reject(resp);
            }
            return r.json();
        }).catch(error => error.then(console.error));
    }

    placeUserInState() {
        console.info(this.currentUser, ' placing in state');
        UserService.setUserInState(this.currentUser);
    }

    getUser(): User {
        return this.currentUser;
    };

    getCurrentOrders() {
         const OrdersURL= new URL(UserService.profileURL.toString());
        OrdersURL.pathname+='/orders'
        return fetch(OrdersURL, {
            method: 'GET',
            headers: {'Accept': 'application/json'},
        }).then(r => {
            if (!r.ok) {
                const resp = r.json();
                console.info(r.status, r.statusText, resp);
                return Promise.reject(resp);
            }
            return r.json();
        }).catch(error => error.then(console.error));
    }

    getOldOrders() {
        console.log('////////////////////////////////////');
        const OrdersURL= new URL(UserService.profileURL.toString());
        OrdersURL.pathname+='/old-orders'
        return fetch(OrdersURL, {
            method: 'GET',
            headers: {'Accept': 'application/json'},
        }).then(r => {
            if (!r.ok) {
                const resp = r.json();
                console.info(r.status, r.statusText, resp);
                return Promise.reject(resp);
            }
            return r.json();
        }).catch(console.error);
    }

    removeUserData(): Promise {
        return fetch(DEFAULT_DOMAIN+'/logout', {
            body: '',
            method: 'POST',
            headers: {'Accept': 'application/json'},
        }).then((status => {
            if (status.ok){
                this.removeUserFromLocalStorage();
                this.currentUser = null;
                console.log(this);
                this.placeUserInState();
                return Promise.resolve(status);
            }
            return  Promise.reject(status);
        }));
    }

    login(formData) {
        return fetch(DEFAULT_DOMAIN +'/login', {
            body: new FormData(formData),
            method: 'POST',
            headers: {'Accept': 'application/json'},
        }).then(r => {
            console.log(r.status, r.statusText, r);
            if (!r.ok || (r.redirected && r.status === 200)) {
                if (r.redirected) {
                    return this.fetchUser().then(response => {
                        this.currentUser = response;
                        this.putUserToLocalStorage(this.currentUser);
                        this.placeUserInState();
                        return Promise.resolve(response);
                    });
                } else {
                    return r.body.getReader().read().then(({done, value}) => {
                        if (value instanceof Uint8Array) {
                            const string = new TextDecoder('utf-8').decode(value);
                            return Promise.reject(JSON.parse(string));
                        }
                        return Promise.reject({});
                    });
                }
            }
            return r.json();
        }).then((response) => {
            this.currentUser = this.putUserToLocalStorage(response);
            this.placeUserInState();
            return Promise.resolve(response);
        });
    }

    updateUser(user: User): Promise {
        this.putUserToLocalStorage(user);

        return Promise.resolve({status: 'ok'});
        fetch(UserService.profileURL, {
            method: 'PUT',
            headers: {'Accept': 'application/json'},
            body: JSON.stringify(user),

        }).then(r => {
            if (!r.ok) {
                const resp = r.json();
                console.info(r.status, r.statusText, resp);
                throw resp;
            }
            return r.json();
        }).catch(error => error.then(console.error));

    }
};

// @flow
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
    static profileURL = new URL('http://localhost/profile');
    static userService:UserService;
    currentUser: User = null;
    static setUserInState;
    static instance(): UserService {
        return UserService.userService;
    }
    static getUserFromLocalStorage(): User | null {
        return JSON.parse(localStorage.getItem('user'));
    }

    constructor(setUser: Function = null) {
        UserService.userService=this;
        UserService.setUserInState = setUser || UserService.setUserInState;
        if (window.api_key && !this.currentUser) {
            this._setKey();
            console.info('i was inited');
            this.currentUser = UserService.getUserFromLocalStorage();
            this.currentUser || this.fetchUser().then(response => {
                this.currentUser = this.putUserToLocalStorage(response);
            });
        }
        if (!window.api_key && this.currentUser) {
            localStorage.removeItem('user');
        }
    }

    _setKey() {
        UserService.profileURL.searchParams.set('t', window.api_key);
    }

    putUserToLocalStorage(user:User): User {
         localStorage.setItem('user',JSON.stringify(user));
         return user;
    }

    fetchUser() {
        return fetch(UserService.profileURL, {
            method: 'GET',
            headers: {'Accept': 'application/json'},
        }).then(r => {
            if (!r.ok) {
                const resp = r.json();
                console.info(r.status, r.statusText, resp);
                throw resp;
            }
            return r.json();
        }).catch(error => error.then(console.error));
    }

    placeUserInState(){
        UserService.setUserInState(this.currentUser);
    }
    getUser(): User {
        return this.currentUser;
    };

    updateUser(user: User): Promise{
        this.putUserToLocalStorage(user)

   return  Promise.resolve({status:'ok'});
        fetch(UserService.profileURL, {
        method: 'PUT',
        headers: {'Accept': 'application/json'},
        body: JSON.stringify(user)

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

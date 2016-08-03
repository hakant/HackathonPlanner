import {Aurelia} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';

@inject(Aurelia, HttpClient)
export class AuthService {
    // As soon as the AuthService is created, we query local storage to
    // see if the login information has been stored. If so, we immediately
    // load it into the session object on the AuthService.
    constructor(Aurelia, HttpClient) {
        this.http = HttpClient;
        this.app = Aurelia;

        this.http.configure(conf => {
            conf.withBaseUrl("http://localhost:3000");
        });
    }

    // The login function needs to abstract away all of the details about
    // how we track and expose login information. A more advanced app might
    // want the login function to pass back a promise so it can perform
    // additional tasks on login, but we keep things simple here.
    login() {
        return this.http.createRequest('/auth/account')
            .withCredentials(true)
            .asGet()
            .send()
            .then(response => {
                if (response.statusCode === 200) {
                    this.app.setRoot('app');
                } else {
                    this.app.setRoot('login');
                }
            })
            .catch(
                error => console.error(error)
            );
    }

    // The logout function reverses the actions of the login function. 
    // It is less common for logout to be async, but logout could also
    // return a promise if there were a need.
    logout() {
        return this.http.createRequest('/auth/logout')
            .withCredentials(true)
            .asGet()
            .send()
            .then(response => {
                if (response.statusCode === 200) {
                    this.app.setRoot('login');
                }
            })
            .catch(
            error => console.error(error)
            );
    }

    // A basic method for exposing information to other modules.
    isAuthenticated() {
        return this.http.createRequest('/auth/account')
            .withCredentials(true)
            .asGet()
            .send()
            .then(response => {
                if (response.statusCode === 200) {
                    return true;
                } else {
                    return false;
                }
            })
            .catch(
            error => {
                console.error(error);
                return false;
            }
            );
    }

    get username() {
        return this.getGitHubUser()
            .then(user => user.username);
    }

    get getGitHubUser() {
        return this.http.createRequest('/auth/account')
            .withCredentials(true)
            .asGet()
            .send()
            .then(response => {
                console.log(response);
                return response.content
            }
        );
    }
}
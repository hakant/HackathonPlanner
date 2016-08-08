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

    login() {
        document.location = "http://localhost:3000/auth/github";
    }

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
                return response.content
            }
        );
    }

    getAnotherGitHubUser(username){
        return this.http.createRequest(`https://api.github.com/users/${username}`)
            .asGet()
            .send()
            .then(response => {
                return response.content;
            }
        );
    }
}
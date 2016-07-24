import {inject} from 'aurelia-framework';
import {computedFrom} from 'aurelia-framework';
import {AuthService} from './services/auth-service';
import {ensure} from 'aurelia-validation';
import {Validation} from 'aurelia-validation';
import {Router} from "aurelia-router";
import {transient} from 'aurelia-framework';
import 'fetch';

@transient()
@inject(AuthService, Validation, Router)
export class Login {
    @ensure(function(it) { it.isNotEmpty() })
    _username;
    _signinClicked = false;

    constructor(auth, validation, router) {
        this.auth = auth;
        this.validation = validation.on(this);
        this.router = router;

        this.router.title = "Hackathon Planner";
    }

    attached() {
        let me = this;
        $('#loginscreen').on('click', '.modal-footer a', function () {
            me.auth.login(me._username);
        });

        $('#loginscreen').openModal();
    }

    SignIn(){
        this._signinClicked = true;
    }

    @computedFrom("_signinClicked")
    get SignInClicked(){
        return this._signinClicked;
    }

    Login() {
        this.validation.validate()
            .then(() => {
                $('#loginscreen').closeModal();
            }).catch(error => {
                // do nothing for now
            });
    }
}

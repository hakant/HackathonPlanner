import {inject} from 'aurelia-framework';
import {computedFrom} from 'aurelia-framework';
import {AuthService} from './infrastructure/auth-service';
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
        $('#login-modal').on('hidden.bs.modal', function () {
            me.auth.login(me._username);
        });
        
        $("#login-modal").modal('show');
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
                $("#login-modal").modal('hide');
            }).catch(error => {
                // do nothing for now
            });
    }
}

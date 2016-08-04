import {inject} from 'aurelia-framework';
import {computedFrom} from 'aurelia-framework';
import {AuthService} from './services/auth-service';
import {ensure} from 'aurelia-validation';
import {Router} from "aurelia-router";
import {transient} from 'aurelia-framework';
import 'fetch';

@transient()
@inject(AuthService, Router)
export class Login {

    constructor(auth, router) {
        this.auth = auth;
        this.router = router;

        this.router.title = "Hackathon Planner";
    }

    attached() {
        let me = this;
        $("#login-modal").modal('show');
    }

    get SignInClicked(){
        return false;
    }
    
    SignIn(){
        this.auth.login();
    }
}

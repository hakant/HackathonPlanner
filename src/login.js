import {inject} from 'aurelia-framework';
import {AuthService} from './infrastructure/auth-service';
import {ensure} from 'aurelia-validation';
import {Validation} from 'aurelia-validation';
import {Router} from "aurelia-router";
import 'fetch';

@inject(AuthService, Validation, Router)
export class Login {
    @ensure(function(it) { it.isNotEmpty() })
    _username;
    
    constructor(auth, validation, router) {
        this.auth = auth;
        this.validation = validation.on(this);
        this.router = router;
        
        this.router.title = "Hackathon Planner";
    }

    Login() {
        this.validation.validate()
            .then(() => {
                this.auth.login(this._username);
                this._username = "";
                this.router.navigateToRoute('overview');
            }).catch(error => {
                
            });
    }
}

import {Router} from "aurelia-router";
import {inject} from 'aurelia-framework';
import {computedFrom} from 'aurelia-framework';
import {AuthService} from './services/auth-service';

@inject(Router, AuthService)
export class FooterContainer {

    constructor(router, auth) {
        this.router = router;
        this.auth = auth;
    }

}

import {Router} from "aurelia-router";
import {inject} from 'aurelia-framework';
import {AuthService} from './services/auth-service'; 

@inject(Router, AuthService)
export class NavBar {
    constructor(router, auth) {
        this.router = router;
        this.auth = auth;
    }

    NewCard() {
        this.router.navigateToRoute('newIdea');
    }
}
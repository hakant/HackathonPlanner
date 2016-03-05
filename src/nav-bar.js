import {Router} from "aurelia-router";
import {inject} from 'aurelia-framework';

@inject(Router)
export class NavBar {
    constructor(router) {
        this.router = router;
    }

    NewCard() {
        this.router.navigateToRoute('newIdea');
    }
}
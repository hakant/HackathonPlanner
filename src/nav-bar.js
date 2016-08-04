import {Router} from "aurelia-router";
import {inject} from 'aurelia-framework';
import {computedFrom} from 'aurelia-framework';
import {AuthService} from './services/auth-service'; 

@inject(Router, AuthService)
export class NavBar {
    _avatarUrl;
    
    constructor(router, auth) {
        this.router = router;
        this.auth = auth;
    }

    NewCard() {
        this.router.navigateToRoute('newIdea');
    }
    
    loadProfilePictureUrl(){
        this.auth.getGitHubUser.then(content => {
                this._avatarUrl = content._json.avatar_url;
            }         
        );
    }
    
    @computedFrom('_avatarUrl')
    get avatarUrl(){
        if (!this._avatarUrl){
            this.loadProfilePictureUrl();   
        }
        
        return this._avatarUrl;
    }
}
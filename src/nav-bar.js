import {Router} from "aurelia-router";
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {computedFrom} from 'aurelia-framework';
import {AuthService} from './services/auth-service'; 

@inject(Router, AuthService, EventAggregator)
export class NavBar {
    _avatarUrl;
    
    constructor(router, auth, eventAggregator) {
        this.router = router;
        this.auth = auth;
        this.eventAgg = eventAggregator;
    }

    NewCard() {
        this.router.navigateToRoute('newIdea');
    }

    Refresh() {
        this.eventAgg.publish('RefreshIdeas');
        $("button").blur();
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
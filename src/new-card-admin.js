import {bindable} from "aurelia-framework";
import {inject} from 'aurelia-framework';
import {ObserverLocator} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Project} from './models/project';
import {Router} from "aurelia-router";
import {AuthService} from './services/auth-service';
import {ProjectService} from './services/project-service';
import 'fetch';

@inject(HttpClient, Router, AuthService, ProjectService, ObserverLocator)
export class NewCardAdmin {
    constructor(http, router, auth, projectService, observerLocator) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('/');
        });

        this.http = http;
        this.router = router;
        this.auth = auth;
        this.projectService = projectService;
        this.userName = '';
        
        this.CreateNewProject();
    }

    CreateNewProject() {
        let me = this;
        this.auth.getGitHubUser.then(function(user){
            me.project = new Project({
                    id: String(Math.floor(Math.random() * 10000) + 1),
                    user: {
                        login: user.username,
                        id: user.id,
                        avatar_url: user._json.avatar_url,
                        name: user.displayName
                    },
                    title: null,
                    liked: false,
                    joined: false,
                    overview: null,
                    description: null,
                    likedList: [],
                    joinedList: [],
                    likeCount: 0,
                    teamCount: 0
                }); 
        });
    }

    attached() {
        var me = this;
        $("#new-card").modal('show');
        $('#new-card').on('hidden.bs.modal', function() {
            me.router.navigateToRoute('overview');
        });

        $("input.card-user").focus();

        $("input.card-user").blur(function(){
            if (typeof me.userName === "undefined") return;

            me.auth.getAnotherGitHubUser(me.userName)
            .then(function(user){
                console.log(user);
                me.project._user = {
                            login: user.username,
                            id: user.id,
                            avatar_url: user.avatar_url,
                            name: user.displayName
                        };
                    })
            });
    }

    detached(){
        $("#new-card").modal('hide');
    }
    
    Save() {
        this.project.validation.validate()
            .then(() => {
                return this.projectService.addProject(this.project);
            })
            .then(() => {
                $("#new-card").modal('hide');
                this.router.navigateToRoute('overview');
            })
            .catch(error => {
                console.log(error);
                $("#new-card").modal('hide');
                this.router.navigateToRoute('overview');
            });
    }

    Cancel() {
        $("#new-card").modal('hide');
        this.router.navigateToRoute('overview');
    }
}
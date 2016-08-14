import {bindable} from "aurelia-framework";
import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Project} from './models/project';
import {Router} from "aurelia-router";
import {AuthService} from './services/auth-service';
import {ProjectService} from './services/project-service';
import {TooltipService} from './services/tooltip-service';
import 'fetch';

@inject(HttpClient, Router, AuthService, ProjectService, TooltipService)
export class NewCard {
    constructor(http, router, auth, projectService, tooltipService) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('/');
        });

        this.http = http;
        this.router = router;
        this.auth = auth;
        this.projectService = projectService;
        this.tooltipService = tooltipService;
        
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

        $("input.card-title").focus();
        
        // tooltips still need a bit of polishing.
        //this.tooltipService.DisplayForPage("NewCard");
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
            });
    }

    Cancel() {
        $("#new-card").modal('hide');
        this.router.navigateToRoute('overview');
    }
}
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
                        login: user.login,
                        id: user.id,
                        avatar_url: user.avatar_url,
                        name: user.name
                    },
                    title: null,
                    liked: false,
                    joined: false,
                    overview: null,
                    description: null,
                    "liked-list": [],
                    "joined-list": [],
                    "like-count": 0,
                    "team-count": 0
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
        
        this.tooltipService.DisplayForPage("NewCard");
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
            });
    }

    Cancel() {
        $("#new-card").modal('hide');
        this.router.navigateToRoute('overview');
    }
}
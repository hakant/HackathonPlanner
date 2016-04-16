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
        this.http.fetch(`https://api.github.com/users/${this.auth.Username}`)
            .then(response => response.json())
            .then(gitHubUser => {
                this.project = new Project({
                    id: Math.floor(Math.random() * 10000) + 1,
                    user: {
                        login: gitHubUser.login,
                        id: gitHubUser.id,
                        avatar_url: gitHubUser.avatar_url,
                        name: gitHubUser.name
                    },
                    title: "",
                    liked: false,
                    joined: false,
                    overview: "",
                    description: "",
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
        let me = this;
        this.project.validation.validate()
            .then(() => {
                $("#new-card").modal('hide');
                me.projectService.addOrUpdateProject(me.project);
                me.router.navigateToRoute('overview');
            }).catch(error => {

            });
    }

    Cancel() {
        $("#new-card").modal('hide');
        this.router.navigateToRoute('overview');
    }
}
import {inject} from 'aurelia-framework';
import {computedFrom} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {ProjectService} from './services/project-service';
import {TooltipService} from './services/tooltip-service';
import {_} from "lodash";

import 'fetch';

@inject(HttpClient, ProjectService, TooltipService)
export class Overview {
    _projects = [];

    constructor(http, projectService, tooltipService) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('/');
        });

        this.http = http;
        this.tooltipService = tooltipService;
        this.projectService = projectService;

        this.projectService.getProjects()
            .then(p => this._projects = p);
    }

    @computedFrom('_projects')
    get projects() {
        return this._projects;
    }
    
    attached(){
        // tooltips still need a bit of polishing.
        //this.tooltipService.DisplayForPage("Overview");    
    }

    refreshJoins(newProjectId){
        _.each(this._projects, project => {
            if (project._id !== newProjectId && project.joined){
                project.joined = false; 
            }
        });
    }
}

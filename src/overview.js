import {inject} from 'aurelia-framework';
import {computedFrom} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {EventAggregator} from 'aurelia-event-aggregator';
import {ProjectService} from './services/project-service';
import {TooltipService} from './services/tooltip-service';
import {_} from "lodash";

import 'fetch';

@inject(HttpClient, ProjectService, TooltipService, EventAggregator)
export class Overview {
    _projects = [];
    _selectedProject = undefined;

    constructor(http, projectService, tooltipService, eventAggregator) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('/');
        });

        this.http = http;
        this.tooltipService = tooltipService;
        this.projectService = projectService;
        this.eventAgg = eventAggregator;

        this.refreshIdeas();
    }

    @computedFrom('_projects')
    get projects() {
        return this._projects;
    }

    @computedFrom('_selectedProject')
    get selectedProject() {
        return this._selectedProject;
    }

    activate(){
        
    }
    
    attached(){
        // tooltips still need a bit of polishing.
        //this.tooltipService.DisplayForPage("Overview");

        this.subscriber = this.eventAgg.subscribe('RefreshIdeas', () => {
            this.refreshIdeas();
        });    
    }

    detached(){
        this.subscriber.dispose();
    }

    changeSelectedProject(newProject){
        this._selectedProject = newProject;
    }

    refreshJoins(newProjectId){
        _.each(this._projects, project => {
            if (project._id !== newProjectId && project.joined){
                project.joined = false; 
            }
        });
    }

    refreshIdeas(){
        this.projectService.getProjects()
            .then(p => this._projects = p);
    }
}

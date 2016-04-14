import {inject} from 'aurelia-framework';
import {computedFrom} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {ProjectService} from './services/project-service';

import 'fetch';

@inject(HttpClient, ProjectService)
export class Overview {
    _projects = [];

    constructor(http, projectService) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('/');
        });

        this.http = http;

        projectService.getProjects()
            .then(p => this._projects = p);
    }

    @computedFrom('_projects')
    get projects() {
        return this._projects;
    }
}

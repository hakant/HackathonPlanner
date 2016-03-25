import {inject} from 'aurelia-framework';
import {computedFrom} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {ApplicationState} from './infrastructure/application-state';

import 'fetch';

@inject(HttpClient, ApplicationState)
export class Overview {
    _projects = [];

    constructor(http, state) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('/');
        });

        this.http = http;

        state.getProjects()
            .then(p => this._projects = p);
    }

    @computedFrom('_projects')
    get projects() {
        return this._projects;
    }
}

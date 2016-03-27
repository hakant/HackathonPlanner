import {AuthService} from './auth-service';
import {HttpClient} from 'aurelia-fetch-client';
import {Project} from '../models/project';
import {inject} from 'aurelia-framework';
import 'fetch';

@inject(AuthService, HttpClient)
export class ApplicationState {
    _projects;
    _projectsJson;
    _token = "HackathonPlanner_Projects";

    constructor(auth, http) {
        this.authService = auth;

        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('/');
        });

        this.http = http;
    }

    getProjects() {
        var me = this;
        return new Promise(function(resolve, reject) {
            if (!me._projects) {
                me.getProjectsFromServerOrStorage.call(me, resolve);
            } else {
                resolve(me._projects);
            }
        })
    }

    addOrUpdateProject(project) {
        // TODO: Find the project and update it
        let projects = this.projectsJson;
        projects.push(
            project.convertToSimpleModel()
        );
        this._projects = this.convertToProjectModels(projects);
        localStorage[this._token] = JSON.stringify(projects);
    }

    get projectsJson() {
        return this._projectsJson;
    }

    set projectsJson(value) {
        localStorage[this._token] = JSON.stringify(value);
        this._projectsJson = value;
    }

    getProjectsFromServerOrStorage(callback) {
        let projectsInLocalStorage = localStorage[this._token];
        if (projectsInLocalStorage) {
            this.projectsJson = JSON.parse(projectsInLocalStorage);
            this._projects = this.convertToProjectModels(this.projectsJson);
            callback(this._projects);
        } else {
            let me = this;
            this.http.fetch('dist/data/data.json')
                .then(response => response.json())
                .then(projects => {
                    me.projectsJson = projects;
                    me._projects = me.convertToProjectModels(
                        me._projectsJson
                    );
                    callback(me._projects);
                });
        }
    }

    convertToProjectModels(json) {
        let items = [];
        for (let item of json) {
            items.push(new Project(item));
        }

        return items;
    }
}
import {HttpClient} from 'aurelia-http-client';
import {Project} from '../models/project';
import {inject} from 'aurelia-framework';
import {_} from "lodash";
import 'fetch';


@inject(HttpClient)
export class ProjectService {
    _projects;
    _projectsJson;
    _storageToken = "HackathonPlanner_Projects";

    constructor(http) {
        this.http = http;
    }

    getProjects() {
        var me = this;
        return new Promise(function(resolve, reject) {
            me.getProjectsFromServer.call(me, resolve);
        })
    }

    addOrUpdateProject(project) {
        var me = this;
        var model = project.convertToSimpleModel();
        this.http.createRequest('http://localhost:3000/ideas')
                 .asPost()
                 .withHeader('Content-Type', 'application/json; charset=utf-8')
                 .withContent(JSON.stringify(model))
                 .send()
                 .then(response => {
                    console.log(response);
                    me.getProjectsFromServer();
                })
                .catch(function (error) {
                    console.log(error.content);
                });
    }

    get projectsJson() {
        return this._projectsJson;
    }

    set projectsJson(value) {
        this._projectsJson = value;
        localStorage[this._storageToken] = JSON.stringify(value);
    }

    getProjectsFromServer(callback) {
        let me = this;

        this.http.createRequest('http://localhost:3000/ideas')
            .asGet()
            .send()
            .then(response => {
                me.projectsJson = response.content;
                me._projects = me.convertToProjectModels(
                    me._projectsJson
                );
                callback(me._projects);
            })
            .catch(function (error) {
            // Handle failed request...
                console.error(error.content);
            });
    }

    convertToProjectModels(json) {
        let items = [];
        for (let item of json) {
            items.push(new Project(item));
        }

        return items;
    }
}
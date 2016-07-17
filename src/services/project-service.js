import {HttpClient} from 'aurelia-http-client';
import {Project} from '../models/project';
import {inject} from 'aurelia-framework';
import {_} from "lodash";
import 'fetch';


@inject(HttpClient)
export class ProjectService {
    _projectsJson;

    constructor(http) {
        this.http = http;
    }

    getProjects() {
        return this.http.createRequest('http://localhost:3000/ideas')
            .asGet()
            .send()
            .then(response => {
                return this.convertToProjectModels(response.content);
            })
            .catch(
                error => console.error(error)
            );
    }

    addOrUpdateProject(project) {
        var model = project.convertToSimpleModel();

        return this.http.createRequest('http://localhost:3000/ideas')
            .asPost()
            .withHeader('Content-Type', 'application/json; charset=utf-8')
            .withContent(JSON.stringify(model))
            .send()
            .then(response => {
                return this.getProjects();
            })
            .catch(
                error => console.log(error)
            );
    }

    convertToProjectModels(json) {
        let items = [];
        for (let item of json) {
            items.push(new Project(item));
        }

        return items;
    }
}
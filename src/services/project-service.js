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

    addProject(project) {
        var model = project.convertToSimpleModel();

        return this.http.createRequest('http://localhost:3000/ideas/add')
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

    editProjectTitle(project){
        return this.http.createRequest('http://localhost:3000/ideas/edit-title')
            .asPost()
            .withHeader('Content-Type', 'application/json; charset=utf-8')
            .withContent(JSON.stringify({
                id: project._id,
                title: project._title
            }))
            .send()
            .then(response => {
                return this.getProjects();
            })
            .catch(
                error => console.log(error)
            );
    }

    editProjectOverview(project){
        return this.http.createRequest('http://localhost:3000/ideas/edit-overview')
            .asPost()
            .withHeader('Content-Type', 'application/json; charset=utf-8')
            .withContent(JSON.stringify({
                id: project._id,
                overview: project._overview
            }))
            .send()
            .then(response => {
                return this.getProjects();
            })
            .catch(
                error => console.log(error)
            );
    }

    editProjectDescription(project){
        return this.http.createRequest('http://localhost:3000/ideas/edit-description')
            .asPost()
            .withHeader('Content-Type', 'application/json; charset=utf-8')
            .withContent(JSON.stringify({
                id: project._id,
                description: project._description
            }))
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
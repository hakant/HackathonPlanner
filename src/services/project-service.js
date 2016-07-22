import {HttpClient} from 'aurelia-http-client';
import {Project} from '../models/project';
import {AuthService} from './auth-service';
import {inject} from 'aurelia-framework';
import {_} from "lodash";
import 'fetch';


@inject(HttpClient, AuthService)
export class ProjectService {
    _projectsJson;

    constructor(http, auth) {
        this.http = http;
        this.auth = auth;

        this.http.configure(conf=>{
            conf.withBaseUrl("http://localhost:3000");    
        });
    }

    getProjects() {
        return this.http.createRequest('/ideas')
            .asGet()
            .send()
            .then(response => {
                console.log(response.content);
                return this.convertToProjectModels(response.content);
            })
            .catch(
                error => console.error(error)
            );
    }

    addProject(project) {
        var model = project.convertToSimpleModel();

        return this.http.createRequest('/ideas/add')
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
        return this.http.createRequest('/ideas/edit-title')
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
        return this.http.createRequest('/ideas/edit-overview')
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
        return this.http.createRequest('/ideas/edit-description')
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

    like(project){
        return this.auth.getGitHubUser
            .then(user => {
                return this.http.createRequest('/ideas/like')
                    .asPost()
                    .withHeader('Content-Type', 'application/json; charset=utf-8')
                    .withContent(JSON.stringify({
                        ideaId: project._id,
                        userId: user.id
                    }))
                    .send();
            }).then(response => {
                return this.getProjects();
            })
            .catch(
            error => console.log(error)
            );
    }

    join(project){
        return this.auth.getGitHubUser
            .then(user => {
                return this.http.createRequest('/ideas/join')
                    .asPost()
                    .withHeader('Content-Type', 'application/json; charset=utf-8')
                    .withContent(JSON.stringify({
                        ideaId: project._id,
                        userId: user.id
                    }))
                    .send();
            }).then(response => {
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
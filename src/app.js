import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Project} from './models/project';
import 'fetch';

@inject(HttpClient)
export class App {
    constructor(http) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('/');
        });

        this.http = http;

        this.http.fetch('dist/data/data.json')
            .then(response => response.json())
            .then(projects => {
                let items = [];
                for (let item of projects) {
                    items.push(new Project(item));
                }
                window._projects = items;
            });
    }

    configureRouter(config, router) {
        config.title = 'Hackathon Planner';
        config.map([
            {
                route: [''],
                name: 'overview',
                moduleId: 'overview',
                nav: false,
                title: 'Overview'
            },
            {
                route: ['ideas'],
                name: 'ideas',
                moduleId: 'ideas',
                nav: false,
                title: 'Hackathon Ideas'
            },
            {
                route: 'ideas/:id',
                name: 'ideaDetail',
                nav: false,
                moduleId: 'idea-card-detail'
            },
            {
                route: 'new-idea',
                name: 'newIdea',
                nav: false,
                title: 'New Idea',
                moduleId: 'new-card'
            }
            ]);

        this.router = router;
    }
}

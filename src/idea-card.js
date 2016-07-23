import {inject} from "aurelia-framework";
import {bindable} from "aurelia-framework";
import {Router} from 'aurelia-router';
import {ProjectService} from './services/project-service';
import {_} from 'lodash';

@inject(Router, ProjectService)
export class IdeaCard {
    @bindable project = null;

    constructor(router, projectService) {
        this.router = router;
        this.projectService = projectService;
    }

    goToCardDetails(event) {
        this.router.navigateToRoute('ideaDetail', { id: this.project._id });
    }

    like(event) {
        let projectId = this.project._id;
        let projectService = this.projectService;

        projectService.like(this.project)
        .then(() => this.project.liked = !this.project.liked);
    }

    join(event) {
        let projectId = this.project._id;
        let projectService = this.projectService;

        if (this.project.joined){
            projectService.unjoin(this.project);
        } else{
            projectService.join(this.project);
        }
    }
}

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

        this.project.liked = !this.project.liked;
        projectService.like(this.project);
    }

    join(event) {
        let projectId = this.project._id;
        let projectService = this.projectService;

        this.project.joined = !this.project.joined;
        projectService.join(this.project);

        // join operation should deactivate the other possible project that I've joined!
    }
}

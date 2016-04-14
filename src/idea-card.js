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

        this.projectService.getProjects()
            .then(projects => {
                let item = _.find(projects, { _id: projectId });
                if (item) {
                    item.liked = !item.liked;
                    projectService.addOrUpdateProject(item);
                }
            })
    }

    join(event) {
        let projectId = this.project._id;
        let projectService = this.projectService;

        this.projectService.getProjects()
            .then(projects => {
                for (let item of projects) {
                    if (item.joined) {
                        item.joined = false;
                        projectService.addOrUpdateProject(item);

                        if (item._id == projectId)
                            return;
                    }

                    if (item._id == projectId) {
                        item.joined = !item.joined;
                        projectService.addOrUpdateProject(item);
                    }
                }
            })
    }
}

import {inject} from "aurelia-framework";
import {bindable} from "aurelia-framework";
import {Router} from 'aurelia-router';
import {ProjectService} from './services/project-service';
import {DialogService} from 'aurelia-dialog';
import {Prompt} from './components/modal';


import {_} from 'lodash';

@inject(Router, ProjectService, DialogService)

export class IdeaCard {
    @bindable project = null;

    constructor(router, projectService, dialogService) {
        this.router = router;
        this.projectService = projectService;
        this.dialogService = dialogService;
    }

    goToCardDetails() {

      this.dialogService.open({viewModel: Prompt, model: this.project._id }).then(response => {
         console.log(response);

         if (!response.wasCancelled) {
            console.log('OK');
         } else {
            console.log('Modal closed');
         }

      });

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

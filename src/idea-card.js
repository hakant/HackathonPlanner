import {inject} from "aurelia-framework";
import {bindable} from "aurelia-framework";
import {Router} from 'aurelia-router';
import {ApplicationState} from './infrastructure/application-state';

@inject(Router, ApplicationState)
export class IdeaCard {
    @bindable project = null;

    constructor(router, state) {
        this.router = router;
        this.state = state;
    }

    goToCardDetails(event) {
        this.router.navigateToRoute('ideaDetail', { id: this.project._id });
    }

    like(event) {
        let projectId = this.project._id;

        this.state.getProjects()
            .then(projects => {
                for (let item of projects) {
                    if (item._id == projectId) {
                        item.liked = !item.liked;
                    }
                }
            })
    }

    join(event) {
        let projectId = this.project._id;

        this.state.getProjects()
            .then(projects => {
                for (let item of projects) {
                    if (item.joined) {
                        item.joined = false;

                        if (item._id == projectId)
                            return;
                    }

                    if (item._id == projectId) {
                        if (item.joined) {
                            item.joined = false;
                        } else {
                            item.joined = true;
                        }
                    }
                }
            })
    }
}

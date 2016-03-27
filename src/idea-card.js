import {inject} from "aurelia-framework";
import {bindable} from "aurelia-framework";
import {Router} from 'aurelia-router';
import {ApplicationState} from './infrastructure/application-state';
import {_} from 'lodash';

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
        let state = this.state;

        this.state.getProjects()
            .then(projects => {
                let item = _.find(projects, { _id: projectId });
                if (item) {
                    item.liked = !item.liked;
                    state.addOrUpdateProject(item);
                }
            })
    }

    join(event) {
        let projectId = this.project._id;
        let state = this.state;

        this.state.getProjects()
            .then(projects => {
                for (let item of projects) {
                    if (item.joined) {
                        item.joined = false;
                        state.addOrUpdateProject(item);

                        if (item._id == projectId)
                            return;
                    }

                    if (item._id == projectId) {
                        item.joined = !item.joined;
                        state.addOrUpdateProject(item);
                    }
                }
            })
    }
}

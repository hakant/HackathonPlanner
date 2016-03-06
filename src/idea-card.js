import {inject} from "aurelia-framework";
import {bindable} from "aurelia-framework";
import {Router} from 'aurelia-router';

@inject(Router)
export class IdeaCard {
    @bindable project = null;

    constructor(router) {
        this.router = router;
    }

    goToCardDetails(event) {
        this.router.navigateToRoute('ideaDetail', { id: this.project._id });
    }

    like(event) {
        let projectId = this.project._id;

        for (let item of window._projects) {
            if (item._id == projectId) {
                item.liked = !item.liked;
            }
        }
    }

    join(event) {
        let projectId = this.project._id;

        for (let item of window._projects) {
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
    }
}

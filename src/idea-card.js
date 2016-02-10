import {inject} from "aurelia-framework";
import {bindable} from "aurelia-framework";
import {Router} from 'aurelia-router';

@inject (Router)
export class IdeaCard{
  @bindable project = null;

  constructor(router){
    this.router = router;
  }

  goToCardDetails(event){
    this.router.navigateToRoute('ideaDetail', { id: this.project._id });
  }
}

import {bindable} from "aurelia-framework";
import {computedFrom} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
import {Project} from './models/project';
import {Router} from 'aurelia-router';

@inject(HttpClient, Router)
export class IdeaCardDetail {
  _editModeEnabled = false;
  project = null;
  lastProjectDescription = null;

  constructor(http, router) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('/');
    });

    this.http = http;
    this.router = router;
  }

  activate(params) {
    return this.http.fetch('dist/data/data.json')
      .then(response => response.json())
      .then(projects => {
        for (let item of projects) {
          if (item.id == params.id) {
            this.project = new Project(item);
            this.lastProjectDescription = this.project._description;
          }
        }
      });
  }

  attached() {
    var myRouter = this.router;
    $(".modal").modal('show');
    $('.modal').on('hidden.bs.modal', function() {
      myRouter.navigateToRoute('overview');
    });
  }

  @computedFrom('_editModeEnabled')
  get EditModeEnabled() {
    return this._editModeEnabled;
  }

  get IsDescriptionEmpty(){
    return this.lastProjectDescription === null ||
            this.lastProjectDescription === "";
  }

  EnableEditMode(event) {
    if (event.srcElement.nodeName.toLowerCase() == "a"){
      return true;
    }

    var me = this;
    $("body").on('mouseup mousemove', function handler(evt) {
      if (evt.type === 'mouseup') {
        me.DoEnableEditMode();
      } else {
        // drag
      }
      $("body").off('mouseup mousemove', handler);
    });
  }

  DoEnableEditMode(){
    this._editModeEnabled = true;

    var selector = `text-${this.project._id}`;
    setTimeout(function() {
      let element = document.getElementById(selector);
      element.style.height = 0;
      element.style.height = (element.scrollHeight) + "px";
      element.focus();
      element.select();
    }, 0);
  }

  Save() {
    this.lastProjectDescription = this.project._description;
    this._editModeEnabled = false;
  }

  Cancel() {
    this.project._description = this.lastProjectDescription;
    this._editModeEnabled = false;
  }

  TextAreaAdjust(event) {
    let element = event.srcElement;

    element.style.height = (element.scrollHeight) + "px";
  }

  Like() {
    this.project.liked = !this.project.liked;
  }

  Join() {
    if (this.project.joined) {
      this.project.joined = false;
      // now unjoin from this through the API
    } else {
      // unjoin from whatever you're joined already through the API
      // and join to this
      this.project.joined = true;
    }
  }
}

import {bindable} from "aurelia-framework";
import {computedFrom} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
import {Project} from './models/project';
import {Router} from 'aurelia-router';

@inject(HttpClient, Router)
export class IdeaCardDetail {
  _titleEditEnabled = false;
  _descrEditEnabled = false;
  _lastProjectTitle = null;
  _lastProjectDescription = null;  
  project = null;

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
            this._lastProjectTitle = this.project._title;
            this._lastProjectDescription = this.project._description;
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

  @computedFrom('_titleEditEnabled')
  get TitleEditEnabled(){
    return this._titleEditEnabled;
  }

  @computedFrom('_descrEditEnabled')
  get DescrEditEnabled() {
    return this._descrEditEnabled;
  }

  get IsDescriptionEmpty(){
    return this._lastProjectDescription === null ||
            this._lastProjectDescription === "";
  }
  
  EnableTitleEdit(event) {
    var me = this;
    var selector = "h2.card-title"
    $(selector).on('mouseup mousemove', function handler(evt) {
      if (evt.type === 'mouseup') {
          me._titleEditEnabled = true;
      } else {
        // drag
      }
      $(selector).off('mouseup mousemove', handler);
    });
  }

  EnableDescrEdit(event) {
    if (event.srcElement.nodeName.toLowerCase() == "a"){
      return true;
    }

    var me = this;
    $("body").on('mouseup mousemove', function handler(evt) {
      if (evt.type === 'mouseup') {
        me.DoEnableDescrEditMode();
      } else {
        // drag
      }
      $("body").off('mouseup mousemove', handler);
    });
  }

  DoEnableDescrEditMode(){
    this._descrEditEnabled = true;

    var selector = `text-${this.project._id}`;
    setTimeout(function() {
      let element = document.getElementById(selector);
      element.style.height = 0;
      element.style.height = (element.scrollHeight) + "px";
      element.focus();
      element.select();
    }, 0);
  }

  SaveTitle() {
    this._lastProjectTitle = this.project._title;
    this._titleEditEnabled = false;
  }

  CancelTitle() {
    this.project._title = this._lastProjectTitle;
    this._titleEditEnabled = false;
  }

  SaveDescription() {  
    this._lastProjectDescription = this.project._description;
    this._descrEditEnabled = false;
  }

  CancelDescription() {
    this.project._description = this._lastProjectDescription;
    this._descrEditEnabled = false;
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

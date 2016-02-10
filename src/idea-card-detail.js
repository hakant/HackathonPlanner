import {bindable} from "aurelia-framework";
import {computedFrom} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
import {Project} from './models/project';

@inject (HttpClient)
export class IdeaCardDetail{
  _editModeEnabled = false;
  project = null;

  constructor(http) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('/');
    });

    this.http = http;
  }

  activate(params){
    return this.http.fetch('dist/data/data.json')
      .then(response => response.json())
      .then(projects => {
        for (let item of projects){
          if (item.id == params.id){
            this.project = new Project(item);
          }
        }
      });
  }

  attached(){
    $(".modal").modal('show');
  }

  @computedFrom('_editModeEnabled')
  get EditModeEnabled(){
    return this._editModeEnabled;
  }

  EnableEditMode(){
    this._editModeEnabled = true;

    var selector = `text-${this.project._id}`;
    setTimeout(function(){
      let element = document.getElementById(selector);
      element.style.height = 0;
      element.style.height = (element.scrollHeight) + "px";
    }, 0);
  }

  Save(){
    this._editModeEnabled = false;
  }

  TextAreaAdjust(event){
    let element = event.srcElement;

    element.style.height = (element.scrollHeight) + "px";
  }
}

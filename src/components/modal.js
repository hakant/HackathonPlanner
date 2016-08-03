import {inject} from 'aurelia-framework';
import {ProjectService} from '../services/project-service';
import {DialogController} from 'aurelia-dialog';
import {Project} from '../models/project';
import {_} from 'lodash';

import {bindable} from "aurelia-framework";
import {computedFrom} from 'aurelia-framework';


@inject(DialogController, ProjectService)

export class Prompt {

  _titleEditEnabled = false;
  _overviewEditEnabled = false;
  _descrEditEnabled = false;
  _lastProjectTitle = null;
  _lastProjectOverview = null;
  _lastProjectDescription = null;

  project = {
      description : ''  // Markdown component doesn't like null values!
  };

   constructor(controller, projectService){
      this.controller = controller;

      this.projectService = projectService;
      this.projectId = null;

      controller.settings.centerHorizontalOnly = true;
      controller.settings.lock = false;
   }

   activate(projectId) {

      this.projectId = projectId;

       this.projectService.getProjects()
           .then(projects => {

                 this.project = _.find(projects, { _id: projectId });

               this._lastProjectTitle = this.project._title;
               this._lastProjectOverview = this.project._overview;
               this._lastProjectDescription = this.project._description;

           });
   }

   attached() {

     window.history.pushState("string", "Modal!", "/#/detail/" + this.projectId);
     $("#card-detail").detach().appendTo("body").openModal({
          dismissible: false,
          complete: function() {
            window.history.pushState("string", "Modal!", "/#");
          }
     });

   }

   @computedFrom('_titleEditEnabled')
   get TitleEditEnabled() {
       return this._titleEditEnabled;
   }

   @computedFrom('_overviewEditEnabled')
   get OverviewEditEnabled() {
       return this._overviewEditEnabled;
   }

   @computedFrom('_descrEditEnabled')
   get DescrEditEnabled() {
       return this._descrEditEnabled;
   }

   get IsDescriptionEmpty() {
       return this._lastProjectDescription === null ||
           this._lastProjectDescription === "";
   }

   EnableTitleEdit(event) {
       var me = this;
       var selector = ".modal-title h5";

       $(selector).on('mouseup mousemove dblclick', function handler(evt) {
           if (evt.type === 'dblclick') {
               me._titleEditEnabled = true;
               setTimeout(function() {
                   $("input.card-title").select();
               }, 0);
           } else {
               // drag
           }
           $(selector).off('mouseup mousemove', handler);
       });
   }

   EnableOverviewEdit(event) {
       var me = this;
       var selector = "div.card-overview"
       $(selector).on('mouseup dblclick', function handler(evt) {
           if (evt.type === 'dblclick') {
               me._overviewEditEnabled = true;
               setTimeout(function() {
                   $("textarea").select();
               }, 0);
           } else {
               // drag
           }
           $(selector).off('mouseup mousemove', handler);
       });
   }

   EnableDescrEdit(event) {
       if (event.srcElement.nodeName.toLowerCase() == "a") {
           return true;
       }

       var me = this;
       $("body").on('mouseup mousemove dblclick doubletap', function handler(evt) {
           if (evt.type === 'dblclick') {
               me.DoEnableDescrEditMode();
           } else {
               // drag
           }
           $("body").off('mouseup mousemove', handler);
       });
   }

   DoEnableDescrEditMode() {
       this._descrEditEnabled = true;

       var selector = `text-${this.project._id}`;
       setTimeout(function() {
           let element = document.getElementById(selector);
           element.style.height = "0px";
           element.style.height = (element.scrollHeight) + "px";
           element.focus();
           //element.select();
       }, 0);
   }

   SaveTitle() {
       this.project.validation.validate()
           .then(() => {
               this.DoSaveTitle();
               this.projectService.editProjectTitle(this.project);
           }).catch(error => {
               console.error(error);
               if (error.properties._title.IsValid) {
                   this.DoSaveTitle();
               }
           });
   }

   DoSaveTitle() {
       this._lastProjectTitle = this.project._title;
       this._titleEditEnabled = false;
   }

   CancelTitle() {
       this.project._title = this._lastProjectTitle;
       this._titleEditEnabled = false;
   }

   SaveOverview() {
       this.project.validation.validate()
           .then(() => {
               this.DoSaveOverview();
               this.projectService.editProjectOverview(this.project);
           }).catch(error => {
               if (error.properties._overview.IsValid) {
                   this.DoSaveOverview();
               }
           });
   }

   DoSaveOverview() {
       this._lastProjectOverview = this.project._overview;
       this._overviewEditEnabled = false;
   }

   CancelOverview() {
       this.project._overview = this._lastProjectOverview;
       this._overviewEditEnabled = false;
   }

   SaveDescription() {
       this._lastProjectDescription = this.project._description;
       this._descrEditEnabled = false;
       this.projectService.editProjectDescription(this.project);
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
       this.projectService.addOrUpdateProject(this.project);
   }

   Join() {
       let projectId = this.project._id;
       let projectService = this.projectService;

       this.project.joined = !this.project.joined;
       projectService.addOrUpdateProject(this.project);

       // join operation should deactivate the other possible project that I've joined!
   }


}

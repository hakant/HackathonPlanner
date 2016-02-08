import {bindable} from "aurelia-framework";
import {computedFrom} from 'aurelia-framework';


export class IdeaCardDetail{
  @bindable project = null;
  _editModeEnabled = false;

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
    }, 100);
  }

  Save(){
    this._editModeEnabled = false;
  }

  TextAreaAdjust(event){
    let element = event.srcElement;

    element.style.height = (element.scrollHeight) + "px";
  }
}

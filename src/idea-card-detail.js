import {bindable} from "aurelia-framework";
import {computedFrom} from 'aurelia-framework';


export class IdeaCardDetail{
  @bindable project = null;
  _editModeEnabled = false;

  @computedFrom('_editModeEnabled')
  get EditModeEnabled(){
    return this._editModeEnabled;
  }

  set EditModeEnabled(value){
    this._editModeEnabled = value;
  }

  EnableEditMode(){
    this._editModeEnabled = true;
  }

  Save(){
    this._editModeEnabled = false;
  }

  TextAreaAdjust(event){
    let element = event.srcElement;

    element.style.height = (element.scrollHeight) + "px";
  }
}

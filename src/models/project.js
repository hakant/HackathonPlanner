import {computedFrom} from 'aurelia-framework';

export class Project {
  data = null;

  constructor(data) {
    this._id = data.id;
    this._user = data.user;
    this._title = data.title;
    this._overview = data.overview;
    this._description = data.description;
    this._labels = data.labels;
    this._liked = data.liked;
    this._joined = data.joined;
    this._likeCount = data["like-count"];
    this._teamCount = data["team-count"];

    this._data = data;
  }

  @computedFrom('_likeCount')
  get likeCount(){
    return this._likeCount;
  }

  @computedFrom('_liked')
  get liked(){
    return this._liked;
  }

  @computedFrom('_teamCount')
  get teamCount(){
    return this._teamCount;
  }

  @computedFrom('_joined')
  get joined(){
    return this._joined;
  }

  @computedFrom('_liked')
  set liked(value){
    this._liked = value;

    if (this._liked)
      this._likeCount++;
    else{
      this._likeCount--;
    }
  }

  @computedFrom('_joined')
  set joined(value){
    this._joined = value;

    if (this._joined)
      this._teamCount++;
    else{
      this._teamCount--;
    }
  }
}

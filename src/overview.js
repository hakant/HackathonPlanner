import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Project} from './models/project';
import 'fetch';

@inject(HttpClient)
export class Overview {
  _projects = [];

  constructor(http) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('/');
    });

    this.http = http;
  }

  activate() {
    return this.http.fetch('dist/data/data.json')
      .then(response => response.json())
      .then(projects => {
        let items = [];
        for (let item of projects){
          items.push(new Project(item));
        }
        this._projects = items;
        return items;
      });
  }

  like(event) {
    let projectId = event.srcElement.dataset.projectid;

    for (let item of this._projects){
      if (item._id == projectId){
        item.liked = !item.liked;
      }
    }
  }

  join(event){
    let projectId = event.srcElement.dataset.projectid;

    for (let item of this._projects){
        if (item.joined){
          item.joined = false;

          if (item._id == projectId)
            return;
      }

      if (item._id == projectId){
        if (item.joined){
          item.joined = false;
        } else {
          item.joined = true;
        }
      }
    }
  }
}

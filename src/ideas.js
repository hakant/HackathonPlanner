import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Project} from './project';
import 'fetch';

@inject(HttpClient)
export class Ideas {
  projects = [];

  constructor(http) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('/');
    });

    this.http = http;
  }

  activate() {
    return this.http.fetch('dist/data.json')
      .then(response => response.json())
      .then(projects => {
        let items = [];
        for (let item of projects){
          items.push(new Project(item));
        }
        this.projects = items;
        return items;
      })
      .then(_ => console.log(this.projects))
  }

  like(event) {
    let projectId = event.srcElement.dataset.projectid;

    for (let item of this.projects){
      if (item.data.id == projectId){
        item.liked = !item.liked;
      }
    }
  }

  join(event){
    let projectId = event.srcElement.dataset.projectid;

    for (let item of this.projects){
        if (item.joined){
          item.joined = false;
      }

      if (item.data.id == projectId){
        if (item.joined){
          item.joined = false;
        } else {
          item.joined = true;
        }
      }
    }
  }
}

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
    console.log(event);
    let userId = event.srcElement.dataset.userid;
    console.log("User ID:" + userId);
    for (let item of this.projects){
      console.log(item.data.id + ' ' + userId);
      if (item.data.id == userId){
        item.liked = !item.liked;
      }
    }

    console.log(this.projects);
  }
}

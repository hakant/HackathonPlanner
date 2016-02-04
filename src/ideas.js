import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Project} from './project';
import 'fetch';

@inject(HttpClient)
export class Users {
  users = [];

  constructor(http) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('/');
    });

    this.http = http;
  }

  activate() {
    return this.http.fetch('dist/users.json')
      .then(response => response.json())
      .then(users => {
        let projects = [];
        for (let user of users){
          projects.push(new Project(user));
        }
        this.users = projects;
        return projects;
      })
      .then(_ => console.log(this.users))
  }

  like(event) {
    console.log(event);
    let userId = event.srcElement.dataset.userid;
    console.log("User ID:" + userId);
    for (let user of this.users){
      console.log(user.data.id + ' ' + userId);
      if (user.data.id == userId){
        user.liked = !user.liked;
      }
    }

    console.log(this.users);
  }
}

import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient)
export class Users {
  users = [];

  constructor(http) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('https://api.github.com/');
    });

    this.http = http;
  }

  activate() {
    return this.http.fetch('users')
      .then(response => response.json())
      .then(users => {
        for(let user of users){
          user.liked = false;
        }
        return users;
      })
      .then(users => this.users = users)
      .then(_ => console.log(this.users[0]))
  }

  like(event) {
    let userId = event.srcElement.dataset.userid;
    for (let user of this.users){
      if (user.id === userId){
        user.liked = true;
      }
    }
  }
}

export class Project {
  data;

  constructor(data) {
    this.data = data;
  }

  get id(){
    return this.data.id;
  }

  get user(){
    return this.data.user;
  }

  get title(){
    return this.data.title;
  }

  get overview(){
    return this.data.overview;
  }

  get description(){
    return this.data.description;
  }

  get labels(){
    return this.data.labels;
  }

  get likeCount(){
    return this.data["like-count"];
  }

  get liked(){
    return this.data.liked;
  }

  get teamCount(){
    return this.data["team-count"];
  }

  get joined(){
    return this.data.joined;
  }

  set liked(value){
    this.data.liked = value;
    if (this.data.liked)
      this.data["like-count"]++;
    else{
      this.data["like-count"]--;
    }
  }

  set joined(value){
    this.data.joined = value;

    if (this.data.joined)
      this.data["team-count"]++;
    else{
      this.data["team-count"]--;
    }
  }
}



export class Project {
  raw = undefined;

  constructor(raw) {
    this.raw = raw;
  }

  get data(){
    return this.raw;
  }

  get liked(){
    return this.raw.liked;
  }

  set liked(value){
    this.raw.liked = value;
    if (this.raw.liked)
      this.raw["like-count"]++;
    else{
      this.raw["like-count"]--;
    }
  }

  get joined(){
    return this.raw.joined;
  }

  set joined(value){
    this.raw.joined = value;

    if (this.raw.joined)
      this.raw["team-count"]++;
    else{
      this.raw["team-count"]--;
    }
  }

  get likeCount(){
    return this.raw["like-count"];
  }

  get teamCount(){
    return this.raw["team-count"];
  }
}

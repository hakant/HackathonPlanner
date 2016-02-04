

export class Project {
  raw = undefined;

  constructor(raw) {
    this.raw = raw;
  }

  get data(){
    console.log("Getter is triggered: ");
    return this.raw;
  }

  get liked(){
    return this.raw.liked;
  }

  set liked(value){
    console.log("Setter is triggered: " + value);
    this.raw.liked = value;
  }
}

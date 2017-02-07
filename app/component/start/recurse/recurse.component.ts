import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'recurse',
  templateUrl:'./recurse.component.html'
})
export class RecurseComponent{

  name:string;


  constructor() {
    this.name = (10 * Math.random()).toString();
    console.log(this.name);
  }


}

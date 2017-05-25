import {Component, OnInit, OnChanges} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  inputs : [],
  selector: 'form-builder-comp',
  templateUrl: 'form-builder.component.html'
})
export class FormBuilderComponent implements OnInit, OnChanges {

  dynamicItems:any;
  group:FormGroup  = new FormGroup({});
  config:any = {};
  model:any={};

  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(changes: {}): any { }

  onSubmitted($event: {}) { }

}

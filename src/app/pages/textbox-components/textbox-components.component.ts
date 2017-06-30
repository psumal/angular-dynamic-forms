import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms'
import {IDynamicFormElementModel} from '../../modules/dymanic-form-element/model/base/form-control-options'
import {ActivatedRoute} from '@angular/router'
import {Observable} from 'rxjs/Observable'

@Component({
  selector: 'app-basic-components',
  templateUrl: './textbox-components.component.html'
})
export class TextboxComponentsComponent implements OnInit {

  dynamicForm: FormGroup;
  formConfig$: Observable<IDynamicFormElementModel>;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.dynamicForm = new FormGroup({});
    this.formConfig$ = this.route.data.pluck('formConfig')
  }

}

import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms'
import {ActivatedRoute} from '@angular/router'
import {IDynamicFormElementModel} from '../../modules/dymanic-form-element/model/base/form-control-options'
import {Observable} from 'rxjs/Observable'

@Component({
  selector: 'app-textarea-components',
  templateUrl: './textarea-components.component.html'
})
export class TextareaComponentsComponent implements OnInit {
  dynamicForm: FormGroup;
  formConfig$: Observable<IDynamicFormElementModel>;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.dynamicForm = new FormGroup({});
    this.formConfig$ = this.route.data.pluck('formConfig')
  }

}

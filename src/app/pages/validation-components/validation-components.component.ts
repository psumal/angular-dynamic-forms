import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms'
import {Observable} from 'rxjs/Observable'
import {IDynamicFormElementModel} from '../../modules/dymanic-form-element/model/base/form-control-options'
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-validation-components',
  templateUrl: './validation-components.component.html'
})
export class ValidationComponentsComponent
  implements OnInit {

  dynamicForm: FormGroup;
  formConfig$: Observable<IDynamicFormElementModel>;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.dynamicForm = new FormGroup({});
    this.formConfig$ = this.route.data.pluck('formConfig')
  }

}

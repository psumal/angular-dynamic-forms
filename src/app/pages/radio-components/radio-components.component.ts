import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms'
import {Observable} from 'rxjs/Observable'
import {ActivatedRoute} from '@angular/router'
import {IDynamicFormElementModel} from '../../modules/dymanic-form-element/model/base/form-control-options'

@Component({
  selector: 'app-radio-components',
  templateUrl: './radio-components.component.html'
})
export class RadioComponentsComponent implements OnInit {

  dynamicForm: FormGroup;
  formConfig$: Observable<IDynamicFormElementModel>;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.dynamicForm = new FormGroup({});
    this.formConfig$ = this.route.data.pluck('formConfig')
  }

}

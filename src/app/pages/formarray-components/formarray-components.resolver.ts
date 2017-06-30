///<reference path="../../../../node_modules/@angular/router/src/interfaces.d.ts"/>
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, Resolve,
  RouterStateSnapshot
} from '@angular/router'
import {IDynamicFormElementModel} from '../../modules/dymanic-form-element/model/base/form-control-options'
import {FormConfigService} from '../../core/core/form-config.service'
import {Observable} from 'rxjs/Observable'

@Injectable()
export class FormArrayComponentsResolver  implements Resolve<IDynamicFormElementModel> {

  constructor(private fcs: FormConfigService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDynamicFormElementModel> | Promise<IDynamicFormElementModel> | IDynamicFormElementModel {
    return this.fcs.getFormArrayConfig()
  }
}

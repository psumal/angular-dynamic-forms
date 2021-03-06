import { Injectable } from '@angular/core';
import {IDynamicFormElementModel} from '../../modules/dymanic-form-element/model/base/form-control-options'
import {Observable} from 'rxjs/Observable'
import {
  ActivatedRouteSnapshot, Resolve,
  RouterStateSnapshot
} from '@angular/router'
import {FormConfigService} from '../../core/core/form-config.service'

@Injectable()
export class ValidationComponentsResolver implements Resolve<IDynamicFormElementModel> {

  constructor(private fcs: FormConfigService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDynamicFormElementModel> | Promise<IDynamicFormElementModel> | IDynamicFormElementModel {
    return this.fcs.getValidationConfig()
  }
}

import {Injectable} from '@angular/core'
import {
  ActivatedRouteSnapshot, Resolve,
  RouterStateSnapshot
} from '@angular/router'
import {IDynamicFormElementModel} from '../../modules/dymanic-form-element/model/base/form-control-options'
import {Observable} from 'rxjs/Observable'
import {FormConfigService} from '../../core/core/form-config.service'

@Injectable()
export class TextboxComponentsResolver implements Resolve<IDynamicFormElementModel> {

  constructor(private fcs: FormConfigService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDynamicFormElementModel> | Promise<IDynamicFormElementModel> | IDynamicFormElementModel {
    return this.fcs.getTextboxConfig()
  }
}

import {DynamicFormElementModel} from "../../../dymanic-form-element/model/base/form-control";
import {IAddressComponentMap} from "./google-address-search-config";
export class GoogleAddressSearchModel extends DynamicFormElementModel {
  addressComponentControls:IAddressComponentMap[];

  constructor(options:any) {
    super(options);
    this.addressComponentControls = options.addressComponentControls || null;
  }
}

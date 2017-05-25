import {Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {AbstractControl, FormGroup} from "@angular/forms";
import {MapsAPILoader} from "@agm/core";
import {DynamicFormElementService} from "../../../dymanic-form-element/dynamic-form-element.service";
import {ValueChangeSubscriptionService} from "../../../reactive-utils/value-change-subscription.service";
import {GoogleAddressSearchModel} from "./google-address-search";

declare var google: any;

@Component({
  inputs: ['config', 'group'],
  selector: 'google-address-search',
  templateUrl: './google-address-search.component.html',
  providers: []
})
export class GoogleAddressSearchComponent implements OnInit, OnDestroy {

  static controlTypes = ["google-address-search"];

  @ViewChild("searchInput")
  searchElementRef: ElementRef;

  @ViewChild("formInput")
  formInput: ElementRef;

  subscriptions: any[] = [];

  place: any;

  private _config: GoogleAddressSearchModel;
  set config(config: GoogleAddressSearchModel) {
    this._config = this.createConfig(config);
  }

  get config(): GoogleAddressSearchModel {
    return this._config;
  }

  private _group: FormGroup;
  set group(group: FormGroup) {
    this._group = group;
  }

  get group(): FormGroup {
    return this._group;
  }

  _isRendered: boolean = true;
  set isRendered(value: boolean) {
    this._isRendered = value;
  }

  get isRendered(): boolean {
    return this._isRendered;
  }

  get currentFormItem(): AbstractControl {
    if (this.group && this.group.get(this.config.key)) {
      return this.group.get(this.config.key);
    }
  }


  //sideEffects
  onValueSubscriptionChanged = ($event: any) => {
    const name = $event.name;
    switch (name) {
      case 'isRendered':
        this.isRendered = $event.result;
        break;
    }

  }

  constructor(private dfs: DynamicFormElementService,
              private vcss: ValueChangeSubscriptionService,
              private mAL: MapsAPILoader,
              private ngZone: NgZone) {
  }

  ngOnInit() {
    this.dfs.addControlConfigToGroup(this.group, this.config);
    this.subscriptions = this.vcss.initValueChangeSubscriptions(this.config, this.group, this.onValueSubscriptionChanged)
    this.initGoogleAutocomplete();
  }

  ngOnDestroy() {
    this.dfs.removeConfigFromGroup(this.group, this.config);
  }

  createConfig(config): GoogleAddressSearchModel {
    return new GoogleAddressSearchModel(config);
  }

  initAddressCopySubscription() {
    this.currentFormItem.valueChanges.subscribe((change) => {
      console.log('initAddressCopySubscription');
      this.explodeAddressIntoFormGroup(change);

      for(let key in this.group.value) {
        console.log('key', key);
        console.log('value', this.group.value.key)
      }

    })
  }

  explodeAddressIntoFormGroup(place: any) {
    place = {...place};
    let street_number: string;
    let route: string;
    let postal_code: string;
    let locality: string;
    let country: string;

    console.log('place', place.address_components);

    if (typeof place === 'object' && 'address_components' in place) {
      place.address_components.forEach(function (component) {
        component.types.forEach(function (addressComponentType) {
          console.log('addressComponentType', addressComponentType)
          if (addressComponentType == 'country') {
            country = component.short_name.toLowerCase()
          }
          if (addressComponentType == 'locality') {
            locality = component.long_name
          }
          if (addressComponentType == 'postal_code') {
            postal_code = component.long_name
          }
          if (addressComponentType == 'route') {
            route = component.long_name
          } else {

          }
          if (addressComponentType == 'street_number') {
            street_number = component.long_name
          }
        });

      });
    }

  }

  initGoogleAutocomplete() {
    this.mAL.load().then(() => {

      let input: HTMLInputElement = this.searchElementRef.nativeElement as HTMLInputElement;
      let autocomplete = new google.maps.places.Autocomplete(input, {
        types: ["address"]
      });

      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          this.place = autocomplete.getPlace();

          //write to model
          this.currentFormItem.setValue(this.place);
          //write to view
          input.value = this.place.formatted_address;
        });
      });
      /**/

    })
  }

  getWrapperClass(): string {
    let classNames: string[] = [];
    classNames.push('form-group');
    classNames.push(...this.config.wrapperClass);
    return classNames.join(' ');
  }

  getControlClass(): string {
    let classNames: string[] = [];

    classNames.push('form-control');

    return classNames.join(' ');
  }

  getCurrentValue() {
    if (this.currentFormItem && 'value' in this.currentFormItem) {
      return this.currentFormItem.value;
    }
  }

  getCurrentStatus() {
    if (this.currentFormItem && 'status' in this.currentFormItem) {
      return this.currentFormItem.status;
    }
  }

  getValidationClass() {
    let classNames: Array<string> = [];

    if (this.currentFormItem.valid && (this.currentFormItem.touched && this.currentFormItem.dirty)) {
      classNames.push('has-success');
    }

    if (!this.currentFormItem.valid && (this.currentFormItem.touched && this.currentFormItem.dirty)) {
      classNames.push('has-danger');
    }

    return classNames.join(' ');
  }

}

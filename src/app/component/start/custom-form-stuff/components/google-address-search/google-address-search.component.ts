import {Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from "@angular/forms";
import {GoogleMapsAPIWrapper, MapsAPILoader} from '@agm/core'
import {DynamicFormService} from "../../../../../common/dynamic-form/services/dynamic-form.service";
import {TextboxItem} from "../../../../../common/dynamic-form/model/item-textbox";
import {IAbstractFormControlModel} from "../../../../../common/dynamic-form/model/item.struckts";

declare var google:any;

@Component({
  inputs: ['config', 'group'],
  selector: 'google-address-search',
  templateUrl: 'google-address-search.component.html'
})
export class GoogleAddressSearchComponent implements OnInit, OnDestroy {

  static controlTypes = ["google-address-search"];
  static createConfig(config):IAbstractFormControlModel {
    return new TextboxItem(config);
  }

  @ViewChild("search")
  searchElementRef: ElementRef;

  subscriptions:any[] = [];

  private _config: TextboxItem;
  set config(config: TextboxItem) {
    this._config = new TextboxItem(config);
  }

  get config(): TextboxItem {
    return this._config;
  }

  private _group: FormGroup;
  set group(group: FormGroup) {
    this._group = group;
  }

  get group(): FormGroup {
    return this._group;
  }

  _isRendered:boolean = true;

  set isRendered(value:boolean) {
    this._isRendered = value;
  }

  get isRendered():boolean {
    return this._isRendered;
  }

  get currentFormItem():AbstractControl {
    if(this.group.get(this.config.key)) {
      return this.group.get(this.config.key);
    }
  }

  constructor(private dfs:DynamicFormService,
              private mAL:MapsAPILoader,
              private ngZone:NgZone) {

  }

  ngOnInit() {

    this.dfs.addConfigToGroup(this.group, this.config);
    console.log('GOOGLE addConfigToGroup', this.config);
    this.initGoogleAutocomplete();
    //this.subscriptions = this.dfs.initValueChangeSubscriptions(this.config, this.group, this.onValueSubscriptionChanged)
  }

  ngOnDestroy() {
    this.dfs.removeConfigFromGroup(this.group, this.config);
  }

  //View helper
  isControlTypeVisible(controlType: string): boolean {
    return this.config.controlType === controlType;
  }

  getWrapperClass():string {
    let classNames: string[] = []
    classNames.push('form-group')
    classNames.push(...this.config.wrapperClass);
    return classNames.join(' ');
  }


  getControlClass(): string {
    let classNames: string[] = [];

    if (this.config.controlType === 'radio' || this.config.controlType === 'checkbox') {
      classNames.push('form-check');
    }
    else if (this.config.controlType === 'textbox' && this.config.inputType === 'file') {
      classNames.push('form-control-file');
    }
    else {
      classNames.push('form-control');
    }

    return classNames.join(' ');
  }

  getCurrentValue() {
    if(this.currentFormItem && 'value' in this.currentFormItem) {
      return this.currentFormItem.value;
    }
  }

  getCurrentStatus() {
    if(this.currentFormItem && 'status' in this.currentFormItem) {
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

  isNoOptPresent() {
    return 'noOptKey' in this.config && !!this.config['noOptKey'];
  }

  getNoOptText() {

    let text: string = "-- noOpt --";

    if ('noOptKey' in this.config && this.config['noOptKey'] && this.config['noOptKey'] !== true) {
      text = this.config['noOptKey'];
    }

    return text;
  }

  //sideEffects
  onValueSubscriptionChanged = ($event:any) => {

    const name = $event.name;
    switch(name) {
      case 'isRendered':
        this.isRendered = $event.result;
        break;
    }

  }


  initGoogleAutocomplete() {
    this.mAL.load().then(() => {

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: any = autocomplete.getPlace();
          console.log('place', place);

           //verify result
           if (place.geometry === undefined || place.geometry === null) {
           return;
           }
          /*
           //set latitude, longitude and zoom
           //this.latitude = place.geometry.location.lat();
           //this.longitude = place.geometry.location.lng();
           //this.zoom = 12;
           */
        });
      });
    })
  }


}

import {Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {AbstractControl, FormGroup} from "@angular/forms";
import {TextboxItem} from "../../../dymanic-form-element/model/item-textbox";
import {AgmCoreModule, MapsAPILoader} from "@agm/core";
import {DynamicFormElementService} from "../../../dymanic-form-element/dynamic-form-element.service";
import {ValueChangeSubscriptionService} from "../../../reactive-utils/value-change-subscription.service";

declare var google: any;

@Component({
  inputs: ['config', 'group'],
  selector: 'google-address-search',
  templateUrl: './google-address-search.component.html',
  providers : []
})
export class GoogleAddressSearchComponent implements OnInit, OnDestroy {

  static controlTypes = ["google-address-search"];

  @ViewChild("searchInput")
  searchElementRef: ElementRef;

  subscriptions: any[] = [];

  place: any;

  private _config: TextboxItem;
  set config(config: TextboxItem) {
    this._config = this.createConfig(config);
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

  constructor(private dfs: DynamicFormElementService,
              private vcss:ValueChangeSubscriptionService,
              private mAL: MapsAPILoader,
              private ngZone: NgZone) {
  }

  ngOnInit() {
    this.dfs.addConfigToGroup(this.group, this.config);
    this.initGoogleAutocomplete();
    this.subscriptions = this.vcss.initValueChangeSubscriptions(this.config, this.group, this.onValueSubscriptionChanged)
  }

  ngOnDestroy() {
    this.dfs.removeConfigFromGroup(this.group, this.config);
  }

  createConfig(config): TextboxItem {
    return new TextboxItem(config);
  }

  initGoogleAutocomplete() {
    this.mAL.load().then(() => {

      let input: HTMLInputElement = this.searchElementRef.nativeElement as HTMLInputElement;
      let autocomplete = new google.maps.places.Autocomplete(input, {
        types: ["address"]
      });


      input.value= 'this.place.formatted_address';

      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          this.place = autocomplete.getPlace();

          //write to model
          this.currentFormItem.setValue(this.place);
          //write to view
          input.value = this.place.formatted_address;

          console.log(this.place.formatted_address);
        });
      });
      /**/

    })
  }

  getWrapperClass(): string {
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

  //sideEffects
  onValueSubscriptionChanged = ($event: any) => {

    const name = $event.name;
    switch (name) {
      case 'isRendered':
        this.isRendered = $event.result;
        break;
    }

  }


}

import {Component, Optional, Inject, SimpleChanges} from "@angular/core";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/merge";
import {
  CHANGE_SUBSCRIPTIONS,
  ChangeSubscriptionFn,
  ChangeSubscriptions
} from "../../dynamic-form/injects/changeSubscriptions";
import {BaseComponent} from "../../dynamic-form/components/base-component/base-component";
import {AbstractFormControlModel} from "../../dynamic-form/model/base/form-control";


@Component({
  moduleId: module.id,
  inputs: ['config', 'group'],
  selector: 'df-item',
  templateUrl: 'control.component.html',
})
export class ControlComponent extends BaseComponent {

  static controlTypes = ["select", "multiselect", "checkbox", "radio", "textbox", "textarea"];

  constructor() {
    super();
  }

  getControlClass(): string {
    let classNames: string[] = [];
    if (this.config.controlType === 'radio' || this.config.controlType === 'checkbox') {
      classNames.push('form-check');
    }
    else if (this.config.controlType === 'textbox' && this.config.type === 'file') {
      classNames.push('form-control-file');
    }
    else {
      classNames.push('form-control');
    }

    return classNames.join('');
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



}

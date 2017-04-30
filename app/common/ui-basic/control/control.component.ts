import {Component, Optional, Inject, SimpleChanges} from "@angular/core";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/merge";
import {
  CHANGE_SUBSCRIPTIONS,
  ChangeSubscriptionFn,
  ChangeSubscriptions
} from "../../dynamic-form/customSubscriptions/changeSubscriptions";
import {BaseComponent} from "../../dynamic-form/components/base-component/base-component";

export interface SubscriptionFn {
  (): any;
}

@Component({
  moduleId: module.id,
  inputs: ['config', 'group'],
  selector: 'df-item',
  templateUrl: 'control.component.html',
})
export class ControlComponent extends BaseComponent {

  static controlTypes = ["select", "multiselect", "checkbox", "radio", "textbox", "textarea"];

  constructor(@Optional() @Inject(CHANGE_SUBSCRIPTIONS) CHANGE_SUBSCRIPTIONS: SubscriptionFn[]) {
    super(CHANGE_SUBSCRIPTIONS);
  }


  ngOnInit() {
    this.initSubscriptionFunctions();
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (this.valueChanged('group', changes, this.group )) {
      this.group = changes['group'].currentValue || {};
    }

    if (this.valueChanged('config', changes, this.config)) {
      this.config = changes['config'].currentValue || [];
    }

  }

}

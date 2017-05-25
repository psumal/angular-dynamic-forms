import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  OnChanges,
  OnInit,
  ViewContainerRef
} from "@angular/core";
import {FormGroup} from "@angular/forms";

import {DynamicFormElementModel} from "./model/base/form-control";
import {DynamicFormElementService} from "./dynamic-form-element.service";
import {DynamicFormElementBindings} from "./dynamic-form-element.bindings";

@Directive({
  inputs: ['config', 'group'],
  selector: '[dynamicFormElement]'
})
export class DynamicFormElementDirective implements DynamicFormElementBindings, OnChanges, OnInit {

  config: DynamicFormElementModel;
  group: FormGroup;

  component: ComponentRef<DynamicFormElementBindings>;

  constructor(private resolver: ComponentFactoryResolver,
              private container: ViewContainerRef,
              private dfes:DynamicFormElementService) {
  }

  ngOnChanges() {
    //if component is set up correctly update values
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
    }
  }

  ngOnInit() {
    const componentClass = this.dfes.getComponent(this.config.controlType);
    if (!componentClass) {
      throw new Error(
        `Trying to use an unsupported type (${this.config.controlType}). Check that your components has a static controlTypes array setup with proper types`
      );
    }

    const componentFactory = this.resolver.resolveComponentFactory<DynamicFormElementBindings>(componentClass);

    this.component = this.container.createComponent(componentFactory);

    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
  }

}

import { ComponentFactoryResolver, ComponentRef, Directive, Input, OnChanges, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';


import {ButtonComponent} from "../button/button.component";
import {DynamicItem} from "../../dynamic-form.scruct";
import {AbstractFormControlModel} from "../../model/base/form-control";

const components: {[type: string]: any} = {
  button: ButtonComponent
};

@Directive({
  inputs: ['config','group'],
  selector: '[dynamicField]'
})
export class DynamicFieldDirective implements DynamicItem, OnChanges, OnInit {

  config: AbstractFormControlModel<any>;
  group: FormGroup;

  component: ComponentRef<DynamicItem>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {}

  ngOnChanges() {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
    }
  }

  ngOnInit() {
    if (!components[this.config.controlType]) {
      const supportedTypes = Object.keys(components).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${this.config.controlType}).
        Supported types: ${supportedTypes}`
      );
    }
    const component = this.resolver.resolveComponentFactory<DynamicItem>(components[this.config.controlType]);
    this.component = this.container.createComponent(component);
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
  }
}

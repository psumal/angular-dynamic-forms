import {Directive, ComponentFactoryResolver, ViewContainerRef} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {ControlComponent} from "../item/control/control.component";
import {AbstractFormControlModel} from "../model/base/form-control";
import {ButtonComponent} from "../item/button/button.component";

const components = {
  item: ControlComponent,
  button:ButtonComponent
};

@Directive({
selector:'[dynamicItem]',
  inputs:['config', 'form']
})
export class DynamicItemDirective {
  config:AbstractFormControlModel<any>;
  form: FormGroup;

  constructor(private resolver: ComponentFactoryResolver,
              private container: ViewContainerRef) {

  }

  ngOnInit() {
    const component = components[this.config.controlType];
    const factory = this.resolver.resolveComponentFactory<any>(component);
  }
}

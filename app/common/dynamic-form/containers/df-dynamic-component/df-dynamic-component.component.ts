import {Directive, ComponentFactoryResolver, ViewContainerRef} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {ButtonComponent} from "../../components/button/button.component";
import {AbstractFormControlModel} from "../../model/base/form-control";

const components = {
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
    console.log('DynamicItemDirective OnInit');
    const component = components[this.config.controlType];
    const factory = this.resolver.resolveComponentFactory<any>(component);
  }
}

import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  OnChanges,
  OnInit,
  ViewContainerRef,
  Inject,
  Optional
} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {DynamicItem} from "../../dynamic-form.scruct";
import {AbstractFormControlModel} from "../../model/base/form-control";
import {UI_COMPONENTS} from "../ui-components.token";

@Directive({
  inputs: ['config', 'group'],
  selector: '[dynamicItem]'
})
export class DynamicItemDirective implements DynamicItem, OnChanges, OnInit {

  config: AbstractFormControlModel;
  group: FormGroup;

  component: ComponentRef<DynamicItem>;

  constructor(private resolver: ComponentFactoryResolver,
              private container: ViewContainerRef,
              @Optional() @Inject(UI_COMPONENTS) private UI_COMPONENTS: Function[]) {
  }


  ngOnChanges() {
    //if component is set up correctly update values
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
    }

  }

  ngOnInit() {

    const componentClass = this.getComponent(this.config.controlType);
    if (!componentClass) {
      throw new Error(
        `Trying to use an unsupported type (${this.config.controlType}). Check that your components has a static controlTypes array setup with proper types`
      );
    }

    const componentFactory = this.resolver.resolveComponentFactory<DynamicItem>(componentClass);

    this.component = this.container.createComponent(componentFactory);

    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
  }

  getComponent(componentName: string): any | undefined {
    let component;

    if (this.UI_COMPONENTS) {
      component = this.UI_COMPONENTS.find(component => {
        let isComponent = false;

        //custom identifier
        if ('controlTypes' in component) {
          isComponent = component['controlTypes'].indexOf(componentName) !== -1;
        }
        else {
          throw new Error(`component: ${component.name} has no custom identifier`);
        }

        return (isComponent) ? isComponent : componentName === component.name;
      });
    } else {
      throw new Error(`No Components provided via UI_COMPONENTS. Import a ui bundle`);
    }

    if (!(typeof component === "function")) {
      throw new Error(`Component "${component}" with name ${componentName} is not provided via UI_COMPONENTS. Maybe your controlType is not present in controlTypes in any component?`);
    }

    return component;

  }

}

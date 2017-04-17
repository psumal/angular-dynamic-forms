import {
  Component, Input, OnInit, ViewContainerRef, ComponentFactoryResolver, ReflectiveInjector,
  ViewChild
}  from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  moduleId: module.id,
  selector: 'dynamic-comp',
  template: '<div #dynamicComponentContainer></div>'
})
export class DynamicFormDynamicComponentComp implements OnInit {

  currentComponent:any = null;

  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;

  @Input() componentType: any;

  @Input('formGroupConfig') item:any;
  @Input() form:any;

  @Input() set componentData(data: {component: any, inputs: any }) {

    if (!data) {
      return;
    }


    // Inputs need to be in the following format to be resolved properly
    let inputProviders = Object.keys(data.inputs).map((inputName) => { console.log('inputName: ', inputName, 'val: ',  data.inputs[inputName]); return {provide: inputName, useValue: data.inputs[inputName]};});
    let resolvedInputs = ReflectiveInjector.resolve(inputProviders);

    // We create an injector out of the data we want to pass down and this components injector
    let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.dynamicComponentContainer.parentInjector);

    // We create a factory out of the component we want to create
    let factory = this.cfr.resolveComponentFactory(data.component);

    // We create the component using the factory and the injector
    let component = factory.create(injector);

    // We insert the component into the dom container
    this.dynamicComponentContainer.insert(component.hostView);

    // We can destroy the old component is we like by calling destroy
    if (this.currentComponent) {
      this.currentComponent.destroy();
    }

    this.currentComponent = component;
  }

  constructor(private viewContainerRef: ViewContainerRef,
              private cfr: ComponentFactoryResolver) {
  }

  ngOnInit() {
    //@TODO https://github.com/angular/angular/issues/9599
    //console.log();
    //let compFactory = this.cfr.resolveComponentFactory(this.componentType);
    //let compRef = this.viewContainerRef.createComponent(compFactory);

    //let inputProviders = [ {provide: 'componentData', useValue: data.inputs[inputName]}];
    //let resolvedInputs = ReflectiveInjector.resolve(inputProviders);

    //console.log('compRef: ', compRef);
    //console.log('form: ', this.item);
    //console.log('form: ', this.form);


  }
}

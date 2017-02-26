import {Component, Input, OnInit, ViewContainerRef, ComponentFactoryResolver}  from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'dynamic-comp',
  template: ''
})
export class DynamicFormDynamicComponentComp implements OnInit {
  @Input() componentType: any;

  constructor(private viewContainerRef: ViewContainerRef,
              private cfr: ComponentFactoryResolver) {
  }

  ngOnInit() {
    let compFactory = this.cfr.resolveComponentFactory(this.componentType);
    this.viewContainerRef.createComponent(compFactory);
  }
}

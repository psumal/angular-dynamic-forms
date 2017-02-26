import {Component, Input, OnInit, ViewContainerRef, ComponentFactoryResolver}  from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'df-dc',
  template: ''
})
export class DFDynamicComponentComp implements OnInit {
  @Input() componentType: any;

  constructor(private viewContainerRef: ViewContainerRef,
              private cfr: ComponentFactoryResolver) {
  }

  ngOnInit() {
    let compFactory = this.cfr.resolveComponentFactory(this.componentType);
    this.viewContainerRef.createComponent(compFactory);
  }
}

/* tslint:disable:member-ordering */
import {Directive, ElementRef, HostListener, Input, OnInit, OnChanges, Renderer, HostBinding} from '@angular/core';

@Directive({
  inputs : ['dynamicFormGroupName'],
  selector: '[dynamicFormGroupName]'
})
export class DynamicFromGroupNameDirective implements OnInit {

  @HostBinding('attr.formGroupName') formGroupName: boolean;


  formGroupName: string;
  dynamicFormGroupName:string;

  constructor(private el: ElementRef, private renderer: Renderer) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes:any): void {

    if('dynamicFormGroupName' in changes) {
      this.updateFormGroupName(changes['dynamicFormGroupName'].currentValue)
    }

  }


  private updateFormGroupName(formGroupName: string) {

    this.dynamicFormGroupName = formGroupName;

    if(formGroupName) {
      console.log('RENDER', 'formGroupTest', formGroupName);
      this.formGroupName = formGroupName;
      //this.renderer.setElementAttribute(this.el.nativeElement, 'formGroupName', formGroupName);
     //this.el.nativeElement.attributes.formGroupName = formGroupName;
    }
     else {
      //this.el.nativeElement.attributesformGroupName;

    }

  }
}


/*
 Copyright 2017 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */

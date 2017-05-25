import {Component, OnInit, OnChanges} from '@angular/core';

@Component({
  inputs : ['config', 'model'],
  selector: 'form-viewer-comp',
  templateUrl: 'form-viewer.component.html'
})
export class FormViewerComponent implements OnInit, OnChanges {

  config:any = [];
  formModel:any={};

  ngOnInit(): void {

  }

  ngOnChanges(changes: {}): any {

    if('config' in changes && changes['config'] != this.config) {

      this.config = changes['config'].currentValue;
    }


  }



}

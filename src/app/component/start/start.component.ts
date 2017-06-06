import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { createTextMaskInputElement } from 'text-mask-core/dist/textMaskCore';
import { createAutoCorrectedDatePipe } from 'text-mask-addons/dist/textMaskAddons';

@Component({
  selector: 'start',
  templateUrl: 'start.component.html',
})
export class StartComponent implements OnInit{
  constructor() {

  }

  ngOnInit(): void {
  }

}

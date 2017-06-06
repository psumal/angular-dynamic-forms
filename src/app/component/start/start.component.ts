import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { createTextMaskInputElement } from 'text-mask-core/dist/textMaskCore';
import { createAutoCorrectedDatePipe } from 'text-mask-addons/dist/textMaskAddons';
import { TextMaskService } from '../../modules/formatter-parser/text-mask-helpers/textMask.service';

@Component({
  selector: 'start',
  templateUrl: 'start.component.html',
})
export class StartComponent implements OnInit{
  @ViewChild("input")
  inputElRef;

  input: HTMLInputElement
  textMaskInput;

  config:any = {
    pipe: createAutoCorrectedDatePipe('mm/dd/yyyy'),
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
    keepCharPositions: true,
  };
  constructor() {

  }

  ngOnInit(): void {
    this.input = this.inputElRef.nativeElement;
    this.textMaskInput = createTextMaskInputElement(Object.assign({inputElement: this.input}, this.config));

    console.log('=>',TextMaskService.getBasicConfig(this.config));
  }

  update() {
    this.textMaskInput.update(this.input.value );
  }





}

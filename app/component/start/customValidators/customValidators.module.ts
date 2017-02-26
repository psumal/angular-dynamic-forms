import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NG_VALIDATORS} from "@angular/forms";
import {validateEmail} from "./emailValidator"

const EXPORTS = [validateEmail];

@NgModule({
  imports: [ CommonModule],
  //exports:      [ EXPORTS ],
  //declarations: [ EXPORTS ],
  providers: [
    { provide: NG_VALIDATORS, useValue: validateEmail, multi: true }
  ]
})
export class CustomValidatorsModule { }

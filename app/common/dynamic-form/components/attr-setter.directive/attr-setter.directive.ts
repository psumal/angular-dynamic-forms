import {Directive, OnChanges, OnInit, ElementRef, SimpleChanges} from "@angular/core";
import {AbstractFormControlModel} from "../../model/base/form-control";


@Directive({
  inputs: ['attrConf'],
  selector: '[attrSetter]'
})
export class AttrSetterDirective implements OnChanges, OnInit {

  attrConf: AbstractFormControlModel<any>;

  constructor(public el: ElementRef) {

  }

  ngOnChanges(changes: SimpleChanges) {


  }

  ngOnInit() {
    this.updateAttributes();
  }

  updateAttributes() {
    const el: any = this.el.nativeElement;

    let set = (attr: string, value: any, isBoolAttr?: boolean) => {

      if(isBoolAttr) {
        !!value?el.setAttribute(attr, ''):el.removeAttribute(attr);
        return;
      }

      value === undefined ? el.removeAttribute(attr):el.setAttribute(attr, value);
    };

    set('accept', this.attrConf['accept']);
    set('autoComplete', this.attrConf['autoComplete']);
    set('aria-describedby', this.attrConf['aria-describedby']);
    set('disabled', this.attrConf['disabled'], true);
    set('list', this.attrConf['list']);
    set('max', this.attrConf['max']);
    set('min', this.attrConf['min']);
    set('multiple', this.attrConf['multiple'], true);
    set('step', this.attrConf['step']);
    set('tabindex', this.attrConf['tabindex']);
    set('autofocus', this.attrConf['autofocus']);
    set('maxlength', this.attrConf['maxlength'], true);
    set('minlength', this.attrConf['minlength'], true);
    set('name', this.attrConf['kez']);
    set('ngClass', this.attrConf['ngClass']);
    set('placeholder', this.attrConf['placeholder']);
    set('readonly', this.attrConf['readonly'], true);
    set('required', this.attrConf['required'], true);
    set('spellcheck', this.attrConf['spellcheck']);
    set('type', this.attrConf['type']);

  }
}

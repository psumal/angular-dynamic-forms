import {Injectable} from "@angular/core";
import {ITextMaskConfigOptions, ITextMasResult} from "./text-mask-config";
import {createAutoCorrectedDatePipe, createNumberMask, emailMask} from "text-mask-addons/dist/textMaskAddons";

const isAndroid = typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent);
const defer = typeof requestAnimationFrame !== 'undefined' ? requestAnimationFrame : setTimeout;


@Injectable()
export class TextMaskService {
  state = {
    previousConformedValue: undefined,
    previousPlaceholder: undefined
  };


  static placeholderChars = {
    whitespace: '\u2000',
    underscore: '_'
  }

  static textMaskProps = [
    'placeholder',
    'placeholderChar',
    'pipe',
    'keepCharPositions',
    'mask',
    'guide'
  ]

  static alphabetic = /[A-Z]/i;
  static digit = /\d/;

  static defaultValues = {
    placeholderChar: ' ',
    guide: true,
    pipe: null,
    keepCharPositions: false,
    help: null,
    placeholder: null
  };

  static getBasicConfig({
                          mask,
                          placeholderChar = '_',
                          guide,
                          pipe,
                          keepCharPositions = false,
                          showMask = true
                        }: ITextMaskConfigOptions = {}):ITextMaskConfigOptions {

    return ({placeholderChar,guide,pipe, keepCharPositions,mask,showMask});
  }

  static getConfig(config: ITextMaskConfigOptions, addon?: { name, config }): ITextMaskConfigOptions {
    const safeConfig: ITextMaskConfigOptions = this.getBasicConfig(config);

    const addonName = (addon && 'name' in addon) ? addon.name : '';
    switch (addonName) {
      case "createNumberMask":
        const numberMask = createNumberMask(addon.config);
        safeConfig.mask = numberMask;
        break;
      case "emailMask":
        safeConfig.mask = emailMask;
        break;
      case "createAutoCorrectedDatePipe":
        safeConfig.mask = [];
        safeConfig.pipe = createAutoCorrectedDatePipe('mm/dd/yyyy');
        safeConfig.keepCharPositions = true;
      break;
    }


    return safeConfig;
  }

}

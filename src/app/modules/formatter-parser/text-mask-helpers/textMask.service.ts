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

  static getBasicConfig(config: ITextMaskConfigOptions = {}):ITextMaskConfigOptions {

    const safeConfig: ITextMaskConfigOptions = {};

    if('mask' in config) {
      safeConfig.mask = config.mask
    }

    if('guide' in config) {
      safeConfig.guide = config.guide
    }

    if('pipe' in config) {
      safeConfig.pipe = config.pipe
    }

    if('placeholderChar' in config) {
      safeConfig.placeholderChar = config.placeholderChar
    }

    if('keepCharPositions' in config) {
      safeConfig.keepCharPositions = config.keepCharPositions
    }

    if('showMask' in config) {
      safeConfig.showMask = config.showMask;
    }

    return safeConfig;
  }

  static getConfig(config: ITextMaskConfigOptions, addon?: { name, config }): ITextMaskConfigOptions {
    const safeConfig:ITextMaskConfigOptions = TextMaskService.getBasicConfig(config);

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
        console.log('before',config, {...safeConfig});
        safeConfig.pipe = createAutoCorrectedDatePipe('mm/dd/yyyy');
        safeConfig.keepCharPositions = true;
        break;
    }


    return safeConfig;
  }

}

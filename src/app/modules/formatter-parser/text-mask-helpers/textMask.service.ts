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
                          mask = [],
                          placeholderChar = ' ',
                          guide = true,
                          pipe = null,
                          keepCharPositions = false,
                          showMask = false
                        }: ITextMaskConfigOptions = {}):ITextMaskConfigOptions {

    return (`${placeholderChar}, ${guide}, ${pipe}, ${keepCharPositions},  ${mask},  ${showMask}`);
  }

  static getConfig(config: ITextMaskConfigOptions, addon?: { name, config }): ITextMaskConfigOptions {
    const safeConfig: ITextMaskConfigOptions = {
      mask: ('mask' in config) ? config.mask : [],
      guide: ('guide' in config) ? config.guide : false,
      pipe: ('pipe' in config) ? config.pipe : undefined,
      placeholderChar: ('placeholderChar' in config) ? config.placeholderChar : '_',
      keepCharPositions: ('keepCharPositions' in config) ? config.keepCharPositions : false,
      showMask: ('showMask' in config) ? config.showMask : false,
    };

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
        safeConfig.pipe = createAutoCorrectedDatePipe('mm/dd/yyyy');
        safeConfig.keepCharPositions = true;
        break;
    }

    console.log('sfaeConfig', safeConfig);
    return safeConfig;
  }

}

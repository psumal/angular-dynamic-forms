import {Injectable} from "@angular/core";
import {textboxTypes, controlTypes, buttonTypes, inputTypes} from "../../common/dynamic-form/model/item.struckts";

@Injectable()
export class FormConfigService {

  static TEXTBOX_TYPES: { value: textboxTypes, name: string }[] = [
    {value: 'text', name: 'Text'},
    {value: 'number', name: 'Number'},
    {value: 'email', name: 'Email'},
    {value: 'tel', name: 'Tel'},
    {value: 'password', name: 'Password'},
    {value: 'date', name: 'Date'},
    {value: 'time', name: 'Time'},
    {value: 'datetime-local', name: 'Datetime-Local'},
    {value: 'week', name: 'Week'},
    {value: 'month', name: 'Month'},
    {value: 'url', name: 'Url'},
    {value: 'hidden', name: 'Hidden'},
    {value: 'range', name: 'Range'},
    {value: 'search', name: 'Search'}
  ];

  static BUTTON_TYPES: { value: buttonTypes, name: string }[] = [
    {value: 'button', name: 'Button'},
    {value: 'reset', name: 'Reset'},
    {value: 'submit', name: 'Submit'}
  ];

  static INPUT_TYPES: { value: buttonTypes, name: string }[] = [].concat(FormConfigService.TEXTBOX_TYPES, FormConfigService.BUTTON_TYPES);


  static CONTROL_TYPES: { value: controlTypes, name: string }[] = [
    {value: 'textbox', name: 'Textbox'},
    {value: 'select', name: 'Select'},
    {value: 'multiselect', name: 'Multiselect'},
    {value: 'checkbox', name: 'Checkbox'},
    {value: 'checkboxInline', name: 'Checkbox Inline'},
    {value: 'radioInline', name: 'Radio Inline'},
    {value: 'textarea', name: 'Textarea'},
    {value: 'button', name: 'Button'},
    {value: 'formGroup', name: 'FormGroup'},

  ];

  static INPUT_VALIDATORS: { value: any, name: string } [] = [
    {value: {name: 'required'}, name: 'Required'},
    //static requiredTrue(control: AbstractControl): {[key: string]: boolean;};
    {value: {name: 'minLength', params: []}, name: 'Min Length'},
    {value: {name: 'maxLength', params: [4]}, name: 'Max Length'},
    {value: {name: 'pattern', params: ["[A-Za-z]+"]}, name: 'Pattern'},
    {value: {name: 'nullValidator', params: ["[A-Za-z]+"]}, name: 'Null Validator'},
    //custom validators

    {
      value: {name: 'controlMatch', params: [[['controlMatchPattern'], ['controlMatch']]]},
      name: 'Control Match Validator'
    },
    //email
    {value: {name: "randomValidator"}, name: 'Validate Email'},
  ];

  static INPUT_ASYNC_VALIDATORS: { value: any, name: string } [] = [
    {value: {name: 'wait2SecToValidateRequired'}, name: 'Wait 2 Sec To Validate Required'},
  ];

  getTextboxConfig() {
    var conf: any = [
      // textbox text
      {
        controlType: 'textbox',
        key: "textboxItem_text",
        label: "Textbox Item of type text",
        type: "text"
      },
      //textbox email
      {
        controlType: 'textbox',
        key: "textboxItem_email",
        label: "Textbox Item of type email",
        type: "email"
      },
      //textbox tel
      {
        controlType: 'textbox',
        key: "textboxItem_tel",
        label: "Textbox Item of type tel",
        type: "tel"
      },
      //textbox password
      {
        controlType: 'textbox',
        key: "textboxItem_password",
        label: "Textbox Item of password",
        type: "password"
      },
      // textbox number
      {
        controlType: 'textbox',
        key: "textboxItem_number",
        label: "Textbox Item of type number",
        type: "number"
      },
      //textbox range
      {
        controlType: 'textbox',
        key: "textboxItem_range",
        label: "Textbox Item of type range",
        type: "range"
      },
      //textbox date
      {
        controlType: 'textbox',
        key: "textboxItem_date",
        label: "Textbox Item of type date",
        type: "date"
      },
      //textbox time
      {
        controlType: 'textbox',
        key: "textboxItem_time",
        label: "Textbox Item of type time",
        type: "time"
      },
      //textbox datetime-local
      {
        controlType: 'textbox',
        key: "textboxItem_datetime-local",
        label: "Textbox Item of type datetime-local",
        type: "datetime-local"
      },
      //textbox week
      {
        controlType: 'textbox',
        key: "textboxItem_week",
        label: "Textbox Item of type week",
        type: "week"
      },
      //textbox month
      {
        controlType: 'textbox',
        key: "textboxItem_month",
        label: "Textbox Item of type month",
        type: "month"
      },
      //textbox url
      {
        controlType: 'textbox',
        key: "textboxItem_url",
        label: "Textbox Item of type url",
        type: "url"
      },
      //textbox search
      {
        controlType: 'textbox',
        key: "textboxItem_search",
        label: "Textbox Item of type search",
        type: "search"
      },
      //hidden
      {
        controlType: 'textbox',
        key: "textboxItem_hidden",
        label: "Textbox Item of type hidden",
        type: "hidden"
      }
    ];

    return conf;
  }

  getCheckboxConfig() {
    var config: any = [
      {
        controlType: 'checkbox',
        key: 'checkboxItem',
        label: 'Checkbox config',
      }
    ];

    return config;
  }

  getRadioConfig() {
    var config: any = [
      {
        controlType: 'radio',
        key: 'radioItem',
        label: 'Radio config',
        options: [
          {key: 'key0', value: 'Short label'},
          {key: 'key1', value: 'Label should always fit'},
          {key: 'key2', value: 'Kind a long label for a radio control'},
          {key: 'key3', value: 'This label is really long for a normal radio control!'},
        ],
      }
    ];

    return config;
  }

  getSelectConfig() {

    let simpleOptions: any = [
      {key: 'key0', value: 'Short label'},
      {key: 'key1', value: 'Label should always fit'},
      {key: 'key2', value: 'Kind a long label for a select box'},
      {key: 'key3', value: 'This label is really long for a normal select box!'},
    ];

    let groupOptions: any = [
      {
        key: "colors",
        value: "Colors",
        children: [
          {key: 0, value: 'red'},
          {key: 1, value: 'green'},
          {key: 2, value: 'blue'},
          {key: 3, value: 'yellow'}
        ]
      },
      {
        key: "shapes",
        value: "Shapes",
        children: [
          {key: 0, value: 'circle'},
          {key: 1, value: 'rectangle'},
          {key: 2, value: 'triangle'},
          {key: 3, value: 'hexagon'}
        ]
      }
    ];


    let config: any = [
      // select
      {
        controlType: 'select',
        key: 'default_select',
        label: 'Default select',
        options: simpleOptions
      },
      // select on option
      {
        controlType: 'select',
        key: 'noopt_select',
        label: 'No option',
        noOptKey: true,
        options: simpleOptions
      },
      // select custom on option
      {
        controlType: 'select',
        key: 'custom_noopt_select',
        label: 'Custom no option',
        noOptKey: "--none--",
        options: simpleOptions
      },
      // select custom on option
      {
        controlType: 'select',
        key: 'option_group_select',
        label: 'Options groups',
        options: groupOptions
      },
      // multiselect
      {
        controlType: 'select',
        disabled: false,
        key: 'multiselect_default',
        label: 'Static color of the stars',
        multiple: true,
        options: simpleOptions
      }
    ];

    return config;
  }

  getTextareaConfig() {
    let config: any = [
      // textarea
      {
        controlType: 'textarea',
        key: 'textareaItem',
        label: 'Textarea Item'
      }
    ];

    return config;
  }

  getButtonConfig() {
    let config: any = [
      //button
      {
        controlType: 'button',
        key: 'buttonReset',
        label: 'Reset',
        type: 'reset'
      },
      //button
      {
        controlType: 'button',
        key: 'buttonSubmit',
        label: 'Submit',
        type: 'submit'
      },
      //button
      {
        controlType: 'button',
        key: 'buttonButton',
        label: 'Button',
        type: 'button'
      }
    ];

    return config;
  }

  getFormGroupConfig() {

    let conf = createFgConfig(2);

    conf.push({
      controlType: 'textbox',
      type: "text",
      key: "TextboxFg" + 3,
      label: "Textbox Item of type url",
      validator: [{name: "required"}]
    });

    return conf;
    //////////////////////////////////

    function createFgConfig(count: any): any {

      let conf = [
        {
          controlType: 'textbox',
          type: "text",
          key: "TextboxFg" + count,
          label: "Textbox Item " + '.' + count + " of fG" + count
        },
        {
          controlType: 'textbox',
          type: "text",
          key: "TextboxFg" + count + '.' + count,
          label: "Textbox Item " + '.' + count + '.' + count + " of fG" + count
        },
        /*{
         controlType: 'textbox',
         type: "text",
         key: "TextboxFg" + count + '.' + count + '.' + count,
         label: "Textbox Item " + count + '.' + count + '.' + count + " of fG" + count
         }*/
        /*
         ,{
         controlType: 'button',
         key: 'buttonButton',
         label: 'Button',
         type: 'button'
         }*/
      ];

      let fg = {
        controlType: 'formGroup',
        key: "fG" + count,
        title: "Form Group " + count,
        config: conf,
        validator: (count > 0) ? {name: 'controlMatch', params: [["TextboxFg2"], ["TextboxFg2.2"]]} : {}
      };


      if (count > 0) {

        fg.config = fg.config.concat(createFgConfig(count - 1));
      }


      return [fg];

    }

  }

  getValidationConfig() {

    let config: any = [];

    let ct: controlTypes = 'textbox';
    let itt: inputTypes = 'text';
    let itn: inputTypes = 'text';

    ////// Basic Control Validators
    let cV: any = this._getRandItem('cV', 'formGroup', null, 'Default Validators', [], [], '', '');

    cV.config.push(this._getRandItem('required', ct, itt, 'Required Validation', [{name: "required"}], [], '', ''));
    cV.config.push(this._getRandItem('minLength2', ct, itt, 'Min Length 2 Validation', [{
      name: "minLength",
      params: [2]
    }], [], '', ''));
    cV.config.push(this._getRandItem('maxLength4', ct, itt, 'Max Length 4 Validation', [{
      name: "maxLength",
      params: [4]
    }], [], '', ''));
    cV.config.push(this._getRandItem('pattern[a-z]', ct, itt, 'Pattern [a-z] Validation', [{
      name: "pattern",
      params: ['[a-z]+']
    }], [], '', ''));
    cV.config.push(this._getRandItem('nullValidator', ct, itt, 'Null Validation', [{name: "nullValidator"}], [], '', ''));

    config.push(cV);

    ////// Custom Control Validators
    let cCV: any = this._getRandItem('cCV', 'formGroup', null, 'Custom Validators', [], [], '', '');

    //cCV.config.push(this._getRandItem('randomValidator', ct, itn, 'Random Validator', [{name: "randomValidator"}], [], '', ''));
    cCV.config.push(this._getRandItem('dividableBy', ct, itn, 'Dividable By [3]', [{
      name: "dividableBy",
      params: [3]
    }], [], '', ''));

    config.push(cCV);

    ////// Custom Async Control Validators
    let cCAV: any = this._getRandItem('cCAV', 'formGroup', null, 'Custom Async validators', [], [], '', '');

    cCAV.config.push(this._getRandItem('promiseValidator', ct, itt, 'Promise Validator (test => true)[2s]', [], [{name: "promiseValidator"}], '', ''));
    cCAV.config.push(this._getRandItem('observableValidator', ct, itt, 'Observable Validator (unique@gmail => true)[0s]', [], [{name: "observableValidator"}], '', ''));

    config.push(cCAV);

    ////// Custom Group Validators

    let gCV1: any = this._getRandItem('gCV1', 'formGroup', null, 'Custom Group Validator controlMatch', [{
      name: 'controlMatch',
      params: [[['controlMatchPattern'], ['controlMatch']]]
    }], [], '', '');

    gCV1.config.push(this._getRandItem('controlMatchPattern', ct, itt, 'Control Match Pattern', [{name: "required"}], [], '', ''));
    gCV1.config.push(this._getRandItem('controlMatch', ct, itt, 'Control Match', [], [], '', ''));

    config.push(gCV1);

    let gCV2: any = this._getRandItem('gCV2', 'formGroup', null, 'Custom Group Validator someOf', [{
      name: 'someOf',
      params: [[['value1'], ['value2'], ['value3'], ['value4']]]
    }], [], '', '');

    gCV2.config.push(this._getRandItem('value1', ct, itt, 'Some Value1', [], [], '', ''));
    gCV2.config.push(this._getRandItem('value2', ct, itt, 'Some Value2', [], [], '', ''));
    gCV2.config.push(this._getRandItem('value3', ct, itt, 'Some Value3', [], [], '', ''));
    gCV2.config.push(this._getRandItem('value4', ct, itt, 'Some Value4', [], [], '', ''));

    config.push(gCV2);


    ////// Custom Async Group Validators
    let gCAv: any = this._getRandItem('gCAv', 'formGroup', null, 'Custom Async Group Validators', [], [], '', '');

    config.push(gCAv);

    ////// Custom Validation Messages
    let gCVM: any = this._getRandItem('gCVM', 'formGroup', null, 'Custom Validation Messages', [{
      name: 'controlMatch',
      params: [['controlMatchPattern'], ['controlMatch']]
    }], [], '', '');

    gCVM.validatorMessages = {"controlMatch": "My custom message for group %cl with %vn"};

    let a = this._getRandItem('c1', ct, itt, 'Control Match Pattern', [{name: "required"}], [], '', '');
    a.validatorMessages = {"required": "My custom message for %cl with %vn"};
    gCVM.config.push(a);

    let b = this._getRandItem('c2', ct, itt, 'Control Match', [], [{name: "promiseValidator"}], '', '');
    b.validatorMessages = {"promiseValidator": "My custom async message for %cl with %vn"};
    gCVM.config.push(b);

    config.push(gCVM);

    return config;
  }

  getFormatterParserConfig() {

    let creditCardMask = {
      name: "maskString",
      params: [
        "0000 0000 0000 0000",
        {'0': /[0-9]/}],
      target: 2
    };
    let replaceSpace = {
      name: "replaceString",
      params: [/ /g, ''],
      target: 1
    };

    let pFA: any[] = [
      creditCardMask,
      replaceSpace
    ];

    let config: any[] = [
      {
        key: 'ccn',
        controlType: 'textbox',
        type: 'text',
        label: 'Credit Card Number',
        formatterParser: pFA,
        parser: pFA
      },
      {
        key: 'ccn-prefilled',
        controlType: 'textbox',
        type: 'text',
        label: 'Credit Card Number (pre filled with "11 112 2223 3 3344 44")',
        formState: '11 112 2223 3 3344 44',
        formatterParser: pFA,
        parser: pFA
      }
    ];

    return config;

  }

  getKitchenSink() {
    let formConfig: Array<any> = [

      //textbox
      {
        controlType: 'textbox',
        key: "textboxItem_text",
        label: "Textbox Item of type text",
        type: "text"
      },
      // checkbox
      {
        controlType: 'checkbox',
        key: 'checkboxItem',
        label: 'Checkbox config',
      },
      //radio
      {
        controlType: 'radio',
        key: 'radioItem',
        label: 'Radio config',
        options: [
          {key: 'key0', value: 'Short label'},
          {key: 'key1', value: 'Label should always fit'},
          {key: 'key2', value: 'Kind a long label for a radio control'},
          {key: 'key3', value: 'This label is really long for a normal radio control!'},
        ],
      },

      // select
      {
        controlType: 'select',
        key: 'selectItem',
        label: 'Select config',
        options: [
          {key: 'key0', value: 'Short label'},
          {key: 'key1', value: 'Label should always fit'},
          {key: 'key2', value: 'Kind a long label for a select box'},
          {key: 'key3', value: 'This label is really long for a normal select box!'},
        ]
      },
      // multiselect
      {
        controlType: 'multiselect',
        key: 'staticColor',
        label: 'Static color of the stars',
        options: [
          {key: 'default', value: 'Default'},
          {key: 'bad', value: 'Bad'},
          {key: 'ok', value: 'Ok'},
          {key: 'good', value: 'Good'}
        ]
      },
      // textarea
      {
        controlType: 'textarea',
        key: 'textareaItem',
        label: 'Textarea Item'
      },
      //button
      //button
      {
        controlType: 'button',
        key: 'buttonSubmit',
        label: 'Submit',
        type: 'submit'
      },
      {
        controlType: 'button',
        key: 'buttonReset',
        label: 'Reset',
        type: 'reset'
      },
      //formGroup
      {
        controlType: 'formGroup',
        key: "groupTest",
        title: "Form Group1",
        config: [
          {
            controlType: 'textbox',
            key: "Textbox in form group 1",
            label: "Textbox Item of type url",
            type: "text"
          },
          {
            controlType: 'button',
            key: 'buttonButton',
            label: 'Button',
            type: 'button'
          }
        ]
      }
    ];
    return formConfig;
  }

  getCustomCompomponentConfig() {
    let formConfig: Array<any> = [
      {
        controlType: 'slider',
        key: "slider",
        title: "Slider Group"
      }
    ];

    return formConfig;

  }

  getPersonalDataConfig() {

    let conf = [];
    let salutation: any = {
      controlType: 'select',
      key: 'anrede',
      label: 'Anrede',
      helpText: "Anrede der Person (Herr Frau)",
      options: [
        {value: [{name: 'Herr'}], key: 'Herr'},
        {value: [{name: 'Frau'}], key: 'Frau'},
        {value: [{name: 'Firma'}], key: 'Firma'}
      ]
    };
    let title: any = {
      controlType: 'select',
      key: 'titel',
      label: 'Titel',
      helpText: "Titel der Person (Dr. Prof.)",
      options: [
        {value: [{name: 'Dr'}], key: 'Dr'},
        {value: [{name: 'Prof'}], key: 'Prof'}
      ]
    };

    let geb: any = {
      controlType: 'textbox',
      key: 'geburtsdatum',
      label: 'Geburtsdatum',
      placeholder: "Geburtsdatum hier",
      helpText: "der Geburtsdatum der Person",
      type: 'date'
    };

    let besch: any = {
      controlType: 'select',
      key: 'beschaeftigung',
      label: 'Beschäftigung',
      helpText: "Beschäftigung der Person (Arbeiter, Angestellter)",
      options: [
        {key: [{name: 'Arbeiter'}], value: 'Arbeiter'},
        {key: [{name: 'Angestellter'}], value: 'Angestellter'}
      ]
    };

    let main_lang: any = {
      controlType: 'select',
      key: 'kommunikationssprache',
      label: 'Kommunikationssprache',
      helpText: "Kommunikationssprache der Person",
      options: [
        {key: [{name: 'Deutsch'}], value: 'Deutsch'},
        {key: [{name: 'Englisch'}], value: 'Englisch'}
      ]
    };

    conf.push(salutation);
    conf.push(title);
    conf.push(this._getRandItem('firstName', 'textbox', 'text', 'Firstname', [], [], '', ''));
    conf.push(this._getRandItem('lastName', 'textbox', 'text', 'Lastname', [], [], '', ''));
    conf.push(geb);
    conf.push(besch);
    conf.push(main_lang);





    return conf;
  }

  getGenericElementConfig() {

    let formConfig: Array<any> = [
      /**/
      // controlType
      {
        controlType: 'select',
        key: 'controlType',
        label: 'Control Type',
        helpText: "This value is used to identify the control type  of the element",
        options: [
          {key: 'textbox', value: 'Textbox'},
          {key: 'select', value: 'Select'},
          {key: 'multiselect', value: 'Multiselect'},
          {key: 'checkbox', value: 'Checkbox'},
          {key: 'checkboxInline', value: 'Checkbox Inline'},
          {key: 'radioInline', value: 'Radio Inline'},
          {key: 'textarea', value: 'Textarea'},
          {key: 'button', value: 'Button'}
        ],
      },
      // type
      {
        controlType: 'select',
        key: 'type',
        label: 'type',
        helpText: "This value is used in the type attribute of the element",
        options: [
          {key: 'text', value: 'text'},
          {key: 'number', value: 'number'},
          {key: 'button', value: 'button'},
          {key: 'submit', value: 'submit'},
          {key: 'reset', value: 'reset'}
        ],
        changeListener: [
          /**/{
            controls: ['controlType'], name: "filteredOptions",
            params: [
              {key: 'textbox', optionsKeys: ['text', 'number']},
              {key: 'button', optionsKeys: ['button', 'submit', 'reset']}
            ]
          },
          {
            controls: ['controlType'], name: "isRendered", params: ['textbox', 'button']
          }
        ]
      },
      //key
      {
        controlType: 'textbox',
        key: "key",
        label: "Key",
        placeholder: "The element key",
        helpText: "This value is used in the id and name attribute of the element",
        type: "text",
        validator: [{name: 'required'}]
      },
      // label
      {
        controlType: 'textbox',
        key: 'label',
        label: 'Label',
        placeholder: "The element label",
        helpText: "This value is used in the lable of the element",
        type: 'text'
      },
      // placeholder
      {
        controlType: 'textbox',
        key: 'placeholder',
        label: 'Placeholder',
        placeholder: "The element placeholder",
        helpText: "This value is used in the placeholder of the element",
        type: 'text',
        validator: [
          {name: "randomValidator"}
        ]
      },
      //validator
      {
        controlType: 'select',
        key: 'validator',
        label: 'Validator',
        helpText: "Select default validation for this element",
        noOptValue: "--none--",
        options: [
          {
            key: "builtIn", value: "built in validators",
            children: [
              {key: [{name: 'required'}], value: 'Required'},
              {key: [{name: 'minLength', params: [2]}], value: 'minLength of 2'}
            ]
          },
          {
            key: "custom", value: "custom in validators",
            children: [
              {key: [{name: 'email'}], value: 'Email'},
            ]
          }
        ],
        changeListener: [{
          controls: ['controlType'],
          name: "isRendered",
          params: ['textbox', 'select', 'multiselect', 'checkbox', 'radio', 'textarea']
        }]
      },
      // help
      {
        controlType: 'textbox',
        key: 'help',
        label: 'Help',
        placeholder: "The element help",
        helpText: "This value is used in the help of the element",
        type: 'text'
      },
      //submit button
      {
        controlType: 'button',
        key: 'submit-button',
        label: 'Update',
        type: 'submit'
      },
      //reset button
      {
        controlType: 'button',
        key: 'reset-button',
        label: 'Reset',
        type: 'reset'
      }
    ];
    return formConfig;
  }

  getCampaign() {

    let formConfig: Array<any> = [
      {
        controlType: 'select',
        key: 'anrede',
        label: 'Anrede',
        helpText: "Anrede der Person (Herr Frau)",
        options: [
          {key: [{name: 'Herr'}], value: 'Herr'},
          {key: [{name: 'Frau'}], value: 'Frau'}
        ]
      },
      {
        controlType: 'select',
        key: 'titel',
        label: 'Titel',
        helpText: "Titel der Person (Dr. Prof.)",
        options: [
          {key: [{name: 'Dr'}], value: 'Dr'},
          {key: [{name: 'Prof'}], value: 'Prof'}
        ]
      },
      {
        controlType: 'textbox',
        key: 'vorname',
        label: 'Vorname',
        placeholder: "Vorname hier",
        helpText: "der Vorname der Person",
        type: 'text'
      },
      {
        controlType: 'textbox',
        key: 'nachname',
        label: 'Nachname',
        placeholder: "Nachname hier",
        helpText: "der Nachname der Person",
        type: 'text'
      },
      {
        controlType: 'textbox',
        key: 'geburtsdatum',
        label: 'Geburtsdatum',
        placeholder: "Geburtsdatum hier",
        helpText: "der Geburtsdatum der Person",
        type: 'date'
      },
      {
        controlType: 'select',
        key: 'beschaeftigung',
        label: 'Beschäftigung',
        helpText: "Beschäftigung der Person (Arbeiter, Angestellter)",
        options: [
          {key: [{name: 'Arbeiter'}], value: 'Arbeiter'},
          {key: [{name: 'Angestellter'}], value: 'Angestellter'}
        ]
      },
      {
        controlType: 'select',
        key: 'kommunikationssprache',
        label: 'Kommunikationssprache',
        helpText: "Kommunikationssprache der Person",
        options: [
          {key: [{name: 'Deutsch'}], value: 'Deutsch'},
          {key: [{name: 'Englisch'}], value: 'Englisch'}
        ]
      },
      {
        controlType: 'textbox',
        key: 'housenr',
        label: 'House Nummer',
        placeholder: "House Nummer hier",
        type: 'text'
      },
      {
        controlType: 'textbox',
        key: 'strasse',
        label: 'Strasse',
        placeholder: "Strassenname hier",
        type: 'text'
      },
      {
        controlType: 'textbox',
        key: 'plz',
        label: 'PLZ',
        placeholder: "PLZ hier",
        type: 'text'
      },
      {
        controlType: 'textbox',
        key: 'stadt',
        label: 'Stadt',
        placeholder: "Stadt hier",
        type: 'text'
      },
      {
        controlType: 'select',
        key: 'Land',
        label: 'Land',
        helpText: "Land der Adresse",
        options: [
          {key: [{name: 'Deutschland'}], value: 'Deutschland'},
          {key: [{name: 'Österreich'}], value: 'Österreich'}
        ]
      },
      {
        controlType: 'textbox',
        key: 'email',
        label: 'Email',
        placeholder: "Email hier",
        type: 'mail',
        validator: [
          {name: 'required'},
          {name: 'randomValidator'},
        ]
      },
      {
        controlType: 'checkbox',
        key: 'emailkontakt',
        label: 'Daf mich per Email kontaktieren'
      },
      {
        controlType: 'textbox',
        key: 'telefonnummer',
        label: 'Telefonnummer',
        type: 'tel',
      },
      {
        controlType: 'textbox',
        key: 'mobilenummer',
        label: 'Mobilenummer',
        type: 'tel',
      },
      {
        controlType: 'select',
        label: 'Sponsorships',
        options: [
          {key: 'hund', value: 'Hund'},
          {key: 'katze', value: 'Katze'},
        ],
      },
      {
        controlType: 'radio',
        key: 'additional_amount',
        label: 'Anderer Betrag',
        options: [
          {key: '100', value: '100'},
          {key: '200', value: '200'},
        ],
      },
      {
        controlType: 'textbox',
        key: 'monatsbetrag',
        label: 'Monatsbetrag',
        type: 'number',
      },
      {
        controlType: 'textbox',
        key: 'jahresbetrag',
        label: 'Jahresbetrag',
        type: 'number',
      },
      {
        controlType: 'select',
        key: 'zahlungs_interval',
        label: 'Zahlungs Interval',
        helpText: "Intervall der Zahlung",
        options: [
          {key: [{name: 'monatlich'}], value: 'monatlich'},
          {key: [{name: 'vierteljährlich'}], value: 'vierteljährlich'},
          {key: [{name: 'halbjährlich'}], value: 'halbjährlich'},
          {key: [{name: 'jährlich'}], value: 'jährlich'}
        ],
        changeListener: [
          /**/{
            controls: ['sponsorship'], name: "filteredOptions",
            params: [
              {key: 'hund', optionsKeys: ['monatlich', 'jährlich']},
              {key: 'katze', optionsKeys: ['vierteljährlich', 'halbjährlich']}
            ]
          }
        ]
      }
    ];
    return formConfig;
  }


  ////////////////////////////////////////////////


  _getRandItem(key: string, controlType?: controlTypes, type?: inputTypes, label?: string, validator?: any[], asyncValidator?: any[], placeholder?: string, helpText?: string, config?: any[]): any {

    controlType = controlType || this._getRandControlType();

    type = type || this._getRandInputType(controlType);

    label = label || '';

    config = [];

    let numOfValidators = (controlType == 'formGroup') ? 1 : null;

    validator = validator || this._getRandInputValidator(numOfValidators);

    asyncValidator = asyncValidator || this._getRandInputAsyncValidator(numOfValidators);

    placeholder = placeholder || '';

    helpText = helpText || '';


    let item: any = {
      key: key,
      label: label,
      placeholder: placeholder,
      helpText: helpText,

      controlType: controlType,
      type: type,
      validator: validator,
      asyncValidator: asyncValidator,

      config: config
    };

    return item;
  }

  _getRandControlType(): controlTypes {
    let controlType;
    return this._getRandArrayItem(FormConfigService.CONTROL_TYPES).value;
  }

  _getRandInputType(controlType: controlTypes): inputTypes {
    let set: any;

    switch (controlType) {
      case 'select':
      case 'multiselect':
      case 'textarea':
        set = [];
        break;
      case 'textbox':
        set = FormConfigService.TEXTBOX_TYPES;
        break;
      case 'button':
        set = FormConfigService.BUTTON_TYPES;
        break;
      default:
        set = FormConfigService.INPUT_TYPES;
    }

    return this._getRandArrayItem(set).value;
  }

  _getRandTextboxType(): textboxTypes {
    let controlType;
    return this._getRandArrayItem(FormConfigService.TEXTBOX_TYPES).value;
  }

  _getRandButtonType(): buttonTypes {
    return this._getRandArrayItem(FormConfigService.BUTTON_TYPES).value;
  }

  _getRandInputValidator(count?: number): any {
    return this._getArrayOfRandItemCount(() => {
      return this._getRandArrayItem(FormConfigService.INPUT_VALIDATORS).value
    }, count);
  }

  _getRandInputAsyncValidator(count?: number): any {
    return this._getArrayOfRandItemCount(() => {
      return this._getRandArrayItem(FormConfigService.INPUT_ASYNC_VALIDATORS).value
    }, count);
  }

  _getArrayOfRandItemCount(cb: Function, count?: number) {
    count = count || Math.floor((Math.random() + 1) * 10);

    let validators = [];

    for (let i = 0; i < count; i++) {
      validators.push(cb());
    }

    return validators;
  }

  _getRandArrayItem(arr: any[]): any {
    return arr[Math.floor(Math.random() * arr.length)]
  }

}

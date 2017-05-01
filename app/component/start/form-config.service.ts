import {Injectable} from "@angular/core";
import {
  textboxTypes,
  controlTypes,
  buttonTypes,
  inputTypes,
  IAbstractControlOptions
} from "../../common/dynamic-form/model/item.struckts";

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

    //email
    {value: {name: "randomValidator"}, name: 'Validate Email'},
  ];

  static INPUT_ASYNC_VALIDATORS: { value: any, name: string } [] = [
    {value: {name: 'wait2SecToValidateRequired'}, name: 'Wait 2 Sec To Validate Required'},
  ];

  getPersonalDataConfig() {

    let conf = [];

    conf.push(this._getRandItem('firstName', 'textbox', 'text', 'Firstname', [], [], '', ''));
    conf.push(this._getRandItem('lastName', 'textbox', 'text', 'Lastname', [], [], '', ''));
    conf.push(this._getRandItem('Agr', 'textbox', 'number', 'Lastname', [], [], '', ''));
    conf.push(this._getRandItem('email', 'textbox', 'email', 'Email', [], [],  '', ''));
    conf.push(this._getRandItem('password', 'textbox', 'password', 'Password', [], [],  '', ''));
    conf.push(this._getRandItem('passwordConfirm', 'textbox', 'password', 'Confirm Password', [], [],  '', ''));

    return conf;
  }

  getValidationTestConfig() {

    let config:any = [];

    let ct:controlTypes = 'textbox';
    let it:inputTypes = 'text';

    ////// Basic Control Validators

    let controlValidationFg:any = this._getRandItem('controlValidationFg', 'formGroup', null, 'Built in validators', [], [], '', '');

    controlValidationFg.config.push(this._getRandItem('required',       ct, it, 'Required Validation',      [ { name : "required"} ],                    [], '', ''));
    controlValidationFg.config.push(this._getRandItem('minLength2',     ct, it, 'Min Length 2 Validation',  [ { name : "minLength", params:[2] } ],      [], '', ''));
    controlValidationFg.config.push(this._getRandItem('maxLength4',     ct, it, 'Max Length 4 Validation',  [ { name : "maxLength", params:[4] } ],      [], '', ''));
    controlValidationFg.config.push(this._getRandItem('pattern[a-z]',   ct, it, 'Pattern [a-z] Validation', [ { name : "pattern", params:['[a-z]+'] } ], [], '', ''));
    controlValidationFg.config.push(this._getRandItem('nullValidator',  ct, it, 'Null Validation',          [ { name : "nullValidator" } ],              [], '', ''));

    config.push(controlValidationFg);

    ////// Custom Control Validators

    let customControlValidationFg:any = this._getRandItem('customControlValidationFg', 'formGroup', null, 'Custom validators', [], [], '', '');

    customControlValidationFg.config.push(this._getRandItem('randomValidator',  ct, 'number', 'Random Validator',          [ { name : "randomValidator" } ],           [], '', ''));
    customControlValidationFg.config.push(this._getRandItem('dividableBy',  ct, 'number', 'Dividable By [3]',          [ { name : "dividableBy", params:[3] } ],           [], '', ''));

    config.push(customControlValidationFg);

    ////// Custom Async Control Validators

    let cAvFg:any = this._getRandItem('cAvFg', 'formGroup', null, 'Custom validators', [], [], '', '');

    //cAvFg.config.push(this._getRandItem('cAvFg1',  ct, 'number', 'Random Validator',          [ { name : "randomValidator" } ],           [], '', ''));
    //cAvFg.config.push(this._getRandItem('cAvFg2',  ct, 'number', 'Dividable By [3]',          [ { name : "dividableBy", params:[3] } ],           [], '', ''));

    config.push(cAvFg);


    //config.push(controlAsyncFormGroupValidationFg);

    ////// Custom Group Validators

    let customGroupValidationFg:any = this._getRandItem('customGroupValidationFg', 'formGroup', null, 'Custom validators',  [ { name : "controlMatch", params:['controlMatch1'] } ], [], '', '');

     customGroupValidationFg.config.push(this._getRandItem('controlMatchPattern',  ct, 'text', 'Control Match Pattern', [],[], '', ''));
     customGroupValidationFg.config.push(this._getRandItem('controlMatch',  ct, 'text', 'Control Match', [],           [], '', ''));

    //config.push(customGroupValidationFg);

    return config;
  }


  getFormGroupTestConfig() {

    let conf = createFgConfig(2);

    conf.push({
      controlType: 'textbox',
      type: "text",
      key: "TextboxFg" + 3,
      label: "Textbox Item of type url"
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
        {
          controlType: 'textbox',
          type: "text",
          key: "TextboxFg" + count + '.' + count + '.' + count,
          label: "Textbox Item " + count + '.' + count + '.' + count + " of fG" + count
        }
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

  getDynCompTestConfig() {
    let formConfig: Array<any> = [
      {
        controlType: 'slider',
        key: "slider",
        title: "Slider Group"
      }
    ];

    return formConfig;

  }

  getConfigForm() {

    let bindings: Array<any> = [
      // id
      {
        controlType: 'textbox',
        key: 'id',
        label: 'Id',
        placeholder: "A string here",
        helpText: "The id attribute of the component",
        type: 'text'
      },
      // rating
      {
        controlType: 'radio',
        key: 'rating',
        label: 'Rating',
        placeholder: "The rating",
        helpText: "Number of stars selected",
        type: 'number'
      },
      // showHalfStars
      {
        controlType: 'checkbox',
        key: 'showHalfStars',
        label: 'showHalfStars',
        value: 5,
      },
      // numOfStars
      {
        controlType: 'textbox',
        key: 'numOfStars',
        label: 'Number of stars',
        type: 'number',
        value: 5,
      },
      // size
      {
        controlType: 'select',
        key: 'size',
        label: 'Stars size',
        options: [
          {key: 'small', value: 'Small'},
          {key: 'medium', value: 'Medium'},
          {key: 'large', value: 'Large'}
        ]
      },
      // spread
      {
        controlType: 'select',
        key: 'spread',
        label: 'Stars spread',
        options: [
          {key: 'no', value: 'No Spread'},
          {key: 'around', value: 'Space around'},
          {key: 'between', value: 'Space between'}
        ]
      },
      // staticColor
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
      // disabled
      {
        controlType: 'checkbox',
        key: 'disabled',
        label: 'Disabled'
      },
      // starType
      {
        controlType: 'select',
        key: 'starType',
        label: 'Type of the stars',
        options: [
          {key: 'svg', value: 'Svg'},
          {key: 'icon', value: 'Icon'},
          {key: 'custom-icon', value: 'Custom Icon'},
        ]
      },
      // text
      {
        controlType: 'textbox',
        key: 'text',
        label: 'Label text',
        type: 'string'
      },
      // labelPosition
      {
        controlType: 'select',
        key: 'labelPosition',
        label: 'Label Position',
        options: [
          {key: 'top', value: 'Top'},
          {key: 'right', value: 'Right'},
          {key: 'left', value: 'Left'},
          {key: 'bottom', value: 'Bottom'}
        ]
      },
      // speed
      {
        controlType: 'select',
        key: 'speed',
        label: 'Animation Speed',
        options: [
          {key: 'immediately', value: 'Immediately'},
          {key: 'noticeable', value: 'Noticeable'},
          {key: 'slow', value: 'Slow'}
        ]
      },
      // direction
      {
        controlType: 'select',
        key: 'direction',
        label: 'Direction',
        options: [
          {key: 'rtl', value: 'Right to left'},
          {key: 'ltr', value: 'Left to right'}
        ]
      },
      // readOnly
      {
        controlType: 'radio',
        key: 'readOnly',
        label: 'Read Only'
      },
      // getColor
      //showHalfStars
      {
        controlType: 'radio',
        key: 'showHalfStars',
        label: 'Show half stars',
        options: [
          {key: 'yes', value: 'Yes'},
          {key: 'no', value: 'No'},
        ],
      },
      {
        controlType: 'button',
        key: 'submitButton',
        label: 'Reset',
        type: 'reset'
      }
      // getHalfStarVisible
      // onClick
      // onRatingChange
    ];
    return bindings.sort((a, b) => a.order - b.order);

  }

  getKitchenSink() {
    let formConfig: Array<any> = [

      // textbox text
      {
        controlType: 'textbox',
        key: "textboxItem_text",
        label: "Textbox Item of type text",
        type: "text",
        validator: [
          //static required(control: AbstractControl): {[key: string]: boolean;};
          {name: 'required'},
          //static requiredTrue(control: AbstractControl): {[key: string]: boolean;};

          //static minLength(minLength: number): ValidatorFn;
          {name: 'minLength', params: [2]},
          //static maxLength(maxLength: number): ValidatorFn;
          {name: 'maxLength', params: [4]},
          //pattern(pattern: string | RegExp): ValidatorFn;
          {name: 'pattern', params: ["[A-Za-z]+"]},
          //nullValidator
          //{name:'nullValidator'}

          //custom validators
          //email
          {name: "randomValidator"}
        ]
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
      },
      //formGroup
      /*{
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
       }*/
    ];
    return formConfig;
  }

  getGenericElement() {

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
        options: [
          {
            key: "builtIn", value: "built in validators", children: [
            {key: [{name: 'required'}], value: 'Required'},
            {key: [{name: 'minLength', params: [2]}], value: 'minLength of 2'}
          ]
          },
          {
            key: "custom", value: "custom in validators", children: [
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
      },
      //formGroup
      {
        controlType: 'formGroup',
        key: "g1",
        label: "Form Group",
        config: [

          /**/
          {
            controlType: 'textbox',
            key: 'g1T1',
            label: 'g1T1',
            placeholder: "The g1T1",
            helpText: "g1T1 of the g1 froup",
            type: 'text'
          },

          {
            controlType: 'button',
            key: 'reset-button',
            label: 'Reset',
            type: 'reset'
          }

        ]
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


  _getRandItem(key: string, controlType?: controlTypes, type?: inputTypes, label?: string, validator?: any[], asyncValidator?: any[], placeholder?:string, helpText?:string, config?:any[] ): any {

    controlType = controlType || this._getRandControlType();

    type = type || this._getRandInputType(controlType);

    label = label || '';

    validator = validator || this._getRandInputValidator();

    config = [];

    asyncValidator = asyncValidator || this._getRandInputAsyncValidator();

    placeholder = placeholder || '';

    helpText = helpText || '';


    let item:any = {
      key: key,
      label: label,
      placeholder: placeholder,
      helpText: helpText,

      controlType: controlType,
      type: type,
      validator: validator,
      asyncValidator: asyncValidator,

      config:config
    };

    return item;
  }

  _getRandControlType(): controlTypes {
    let controlType;
    return this._getRandArrayItem(FormConfigService.CONTROL_TYPES).value;
  }

  _getRandInputType(controlType: controlTypes): inputTypes {
    let set:any;

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

  _getRandArrayItem(arr:any[]):any {
    return arr[Math.floor(Math.random() * arr.length)]
  }

}

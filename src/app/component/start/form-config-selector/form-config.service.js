"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var core_1 = require("@angular/core");
var FormConfigService = FormConfigService_1 = (function () {
  function FormConfigService() {
  }

  FormConfigService.prototype.getTextboxConfig = function () {
    var conf = {
      config: [
        // textbox text
        {
          controlType: 'textbox',
          key: "textboxItem_text",
          label: "Textbox Item of type text",
          inputType: "text"
        },
        //textbox email
        {
          controlType: 'textbox',
          key: "textboxItem_email",
          label: "Textbox Item of type email",
          inputType: "email"
        },
        //textbox tel
        {
          controlType: 'textbox',
          key: "textboxItem_tel",
          label: "Textbox Item of type tel",
          inputType: "tel"
        },
        //textbox password
        {
          controlType: 'textbox',
          key: "textboxItem_password",
          label: "Textbox Item of password",
          inputType: "password"
        },
        // textbox number
        {
          controlType: 'textbox',
          key: "textboxItem_number",
          label: "Textbox Item of type number",
          inputType: "number"
        },
        //textbox range
        {
          controlType: 'textbox',
          key: "textboxItem_range",
          label: "Textbox Item of type range",
          inputType: "range"
        },
        //textbox date
        {
          controlType: 'textbox',
          key: "textboxItem_date",
          label: "Textbox Item of type date",
          inputType: "date"
        },
        //textbox time
        {
          controlType: 'textbox',
          key: "textboxItem_time",
          label: "Textbox Item of type time",
          inputType: "time"
        },
        //textbox datetime-local
        {
          controlType: 'textbox',
          key: "textboxItem_datetime-local",
          label: "Textbox Item of type datetime-local",
          inputType: "datetime-local"
        },
        //textbox week
        {
          controlType: 'textbox',
          key: "textboxItem_week",
          label: "Textbox Item of type week",
          inputType: "week"
        },
        //textbox month
        {
          controlType: 'textbox',
          key: "textboxItem_month",
          label: "Textbox Item of type month",
          inputType: "month"
        },
        //textbox url
        {
          controlType: 'textbox',
          key: "textboxItem_url",
          label: "Textbox Item of type url",
          inputType: "url"
        },
        //textbox search
        {
          controlType: 'textbox',
          key: "textboxItem_search",
          label: "Textbox Item of type search",
          inputType: "search"
        },
        //hidden
        {
          controlType: 'textbox',
          key: "textboxItem_hidden",
          label: "Textbox Item of type hidden",
          inputType: "hidden"
        }
      ]
    };
    return conf;
  };
  FormConfigService.prototype.getCheckboxConfig = function () {
    var config = {
      config: [
        {
          controlType: 'checkbox',
          key: 'checkboxItem',
          label: 'Checkbox config',
        }
      ]
    };
    return config;
  };
  FormConfigService.prototype.getRadioConfig = function () {
    var config = {
      config: [
        {
          controlType: 'radio',
          key: 'radioItem',
          label: 'Radio config',
          options: [
            {label: 'key0', value: 'Short label'},
            {label: 'key1', value: 'Label should always fit'},
            {label: 'key2', value: 'Kind a long label for a radio control'},
            {label: 'key3', value: 'This label is really long for a normal radio control!'},
          ],
        }
      ]
    };
    return config;
  };
  FormConfigService.prototype.getSelectConfig = function () {
    var simpleOptions = [
      {label: 'key0', value: 'Short label'},
      {label: 'key1', value: 'Label should always fit'},
      {label: 'key2', value: 'Kind a long label for a select box'},
      {label: 'key3', value: 'This label is really long for a normal select box!'},
    ];
    var groupOptions = [
      {
        label: "colors",
        value: "Colors",
        options: [
          {label: 'red', value: '0'},
          {label: 'green', value: '1'},
          {label: 'blue', value: '2'},
          {label: 'yellow', value: '3'}
        ]
      },
      {
        label: "shapes",
        value: "Shapes",
        options: [
          {label: 'circle', value: '0'},
          {label: 'rectangle', value: '1'},
          {label: 'triangle', value: '2'},
          {label: 'hexagon', value: '3'}
        ]
      }
    ];
    var config = [
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
    var formGroup = {
      config: config
    };
    return formGroup;
  };
  FormConfigService.prototype.getTextareaConfig = function () {
    var config = {
      config: [
        // textarea
        {
          controlType: 'textarea',
          key: 'textareaItem',
          label: 'Textarea Item'
        }
      ]
    };
    return config;
  };
  FormConfigService.prototype.getButtonConfig = function () {
    var config = {
      config: [
        //button
        {
          controlType: 'button',
          key: 'buttonReset',
          label: 'Reset',
          inputType: 'reset'
        },
        //button
        {
          controlType: 'button',
          key: 'buttonSubmit',
          label: 'Submit',
          inputType: 'submit'
        },
        //button
        {
          controlType: 'button',
          key: 'buttonButton',
          label: 'Button',
          inputType: 'button'
        }
      ]
    };
    return config;
  };
  FormConfigService.prototype.getFormGroupConfig = function () {
    var conf = createFgConfig(2);
    conf.push({
      controlType: 'textbox',
      inputType: "text",
      key: "TextboxFg" + 3,
      label: "Textbox Item of type url",
      validator: [{name: "required"}]
    });
    var config = {
      config: conf
    };
    return config;
    //////////////////////////////////
    function createFgConfig(count) {
      var conf = [
        {
          controlType: 'textbox',
          inputType: "text",
          key: "TextboxFg" + count,
          label: "Textbox Item " + '.' + count + " of fG" + count
        },
        {
          controlType: 'textbox',
          inputType: "text",
          key: "TextboxFg" + count + '.' + count,
          label: "Textbox Item " + '.' + count + '.' + count + " of fG" + count
        },
      ];
      var fg = {
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
  };
  FormConfigService.prototype.getValidationConfig = function () {
    var config = [];
    var ct = 'textbox';
    var itt = 'text';
    var itn = 'text';
    ////// Basic Control Validators
    var cV = this._getRandItem('cV', 'formGroup', null, 'Default Validators', [], [], '', '');
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
    var cCV = this._getRandItem('cCV', 'formGroup', null, 'Custom Validators', [], [], '', '');
    //cCV.config.push(this._getRandItem('randomValidator', ct, itn, 'Random Validator', [{name: "randomValidator"}], [], '', ''));
    cCV.config.push(this._getRandItem('dividableBy', ct, itn, 'Dividable By [3]', [{
      name: "dividableBy",
      params: [3]
    }], [], '', ''));
    config.push(cCV);
    ////// Custom Async Control Validators
    var cCAV = this._getRandItem('cCAV', 'formGroup', null, 'Custom Async validators', [], [], '', '');
    cCAV.config.push(this._getRandItem('promiseValidator', ct, itt, 'Promise Validator (test => true)[2s]', [], [{name: "promiseValidator"}], '', ''));
    cCAV.config.push(this._getRandItem('observableValidator', ct, itt, 'Observable Validator (unique@gmail => true)[0s]', [], [{name: "observableValidator"}], '', ''));
    config.push(cCAV);
    ////// Custom Group Validators
    var gCV1 = this._getRandItem('gCV1', 'formGroup', null, 'Custom Group Validator controlMatch', [{
      name: 'controlMatch',
      params: [[['controlMatchPattern'], ['controlMatch']]]
    }], [], '', '');
    gCV1.config.push(this._getRandItem('controlMatchPattern', ct, itt, 'Control Match Pattern', [{name: "required"}], [], '', ''));
    gCV1.config.push(this._getRandItem('controlMatch', ct, itt, 'Control Match', [], [], '', ''));
    config.push(gCV1);
    var gCV2 = this._getRandItem('gCV2', 'formGroup', null, 'Custom Group Validator someOf', [{
      name: 'someOf',
      params: [[['value1'], ['value2'], ['value3'], ['value4']]]
    }], [], '', '');
    gCV2.config.push(this._getRandItem('value1', ct, itt, 'Some Value1', [], [], '', ''));
    gCV2.config.push(this._getRandItem('value2', ct, itt, 'Some Value2', [], [], '', ''));
    gCV2.config.push(this._getRandItem('value3', ct, itt, 'Some Value3', [], [], '', ''));
    gCV2.config.push(this._getRandItem('value4', ct, itt, 'Some Value4', [], [], '', ''));
    config.push(gCV2);
    ////// Custom Async Group Validators
    var gCAv = this._getRandItem('gCAv', 'formGroup', null, 'Custom Async Group Validators', [], [], '', '');
    config.push(gCAv);
    ////// Custom Validation Messages
    var gCVM = this._getRandItem('gCVM', 'formGroup', null, 'Custom Validation Messages', [{
      name: 'controlMatch',
      params: [['controlMatchPattern'], ['controlMatch']]
    }], [], '', '');
    gCVM.validatorMessages = {"controlMatch": "My custom message for group %cl with %vn"};
    var a = this._getRandItem('c1', ct, itt, 'Control Match Pattern', [{name: "required"}], [], '', '');
    a.validatorMessages = {"required": "My custom message for %cl with %vn"};
    gCVM.config.push(a);
    var b = this._getRandItem('c2', ct, itt, 'Control Match', [], [{name: "promiseValidator"}], '', '');
    b.validatorMessages = {"promiseValidator": "My custom async message for %cl with %vn"};
    gCVM.config.push(b);
    config.push(gCVM);
    var formGrougConfig = {
      config: config
    };
    return formGrougConfig;
  };
  FormConfigService.prototype.getFormatterParserConfig = function () {
    var creditCardMask = {
      name: "maskString",
      params: [
        "0000 0000 0000 0000",
        {'0': /[0-9]/}
      ],
      target: 2
    };
    var replaceSpace = {
      name: "replaceString",
      params: [/ /g, ''],
      target: 1
    };
    var pFA = [
      creditCardMask,
      replaceSpace
    ];
    var config = [
      {
        key: 'ccn',
        controlType: 'textbox',
        inputType: 'text',
        label: 'Credit Card Number',
        formatterParser: pFA,
        parser: pFA
      },
      {
        key: 'ccn-prefilled',
        controlType: 'textbox',
        inputType: 'text',
        label: 'Credit Card Number (pre filled with "11 112 2223 3 3344 44")',
        formState: '11 112 2223 3 3344 44',
        formatterParser: pFA,
        parser: pFA
      }
    ];
    var fgConfig = {
      config: config
    };
    return fgConfig;
  };
  FormConfigService.prototype.getCustomCompomponentConfig = function () {
    var config = {
      config: [
        {
          controlType: 'slider',
          key: "slider",
          title: "Slider Group"
        }
      ]
    };
    return config;
  };
  FormConfigService.prototype.getPersonalDataConfig = function () {
    var salutation = {
      label: 'Anrede',
      wrapperClass: ['col-sm-3'],
      controlType: 'select',
      key: 'anrede',
      options: [
        {label: 'Herr', value: '0'},
        {label: 'Frau', value: '1'},
        {label: 'Firma', value: '2'}
      ],
      validator: [
        {name: "required"}
      ]
    };
    var isCompany = {
      label: 'Als Firma',
      wrapperClass: ['col-sm-3'],
      controlType: 'checkbox',
      key: 'isCompany'
    };
    var companyName = {
      label: 'Firma',
      wrapperClass: ['col-sm-3'],
      controlType: 'textbox',
      key: 'company',
      formatterParser: [
        {name: 'toCapitalized', target: 2}
      ],
      valueChangeSubscriptions: [
        {name: "isRendered", controls: ['isCompany'], params: [true]}
      ],
      validator: [
        {name: "required"}
      ]
    };
    var title = {
      controlType: 'select',
      key: 'titel',
      label: 'Titel',
      wrapperClass: ['col-sm-4'],
      options: [
        {value: 0, label: 'Dr'},
        {value: 0, label: 'Prof'}
      ]
    };
    var geb = {
      controlType: 'textbox',
      key: 'geburtsdatum',
      label: 'Geburtsdatum',
      wrapperClass: ['col-sm-4'],
      placeholder: "Geburtsdatum hier",
      helpText: "der Geburtsdatum der Person",
      inputType: 'date',
      validator: [
        {name: "required"}
      ]
    };
    var besch = {
      controlType: 'select',
      key: 'beschaeftigung',
      label: 'Beschäftigung',
      wrapperClass: ['col-sm-4'],
      helpText: "Beschäftigung der Person (Arbeiter, Angestellter)",
      options: [
        {label: 'Arbeiter', value: 'Arbeiter'},
        {label: 'Angestellter', value: 'Angestellter'}
      ]
    };
    var main_lang = {
      controlType: 'select',
      key: 'kommunikationssprache',
      label: 'Kommunikationssprache',
      //wrapperClass:['col-sm-4'],
      helpText: "Kommunikationssprache der Person",
      options: [
        {label: 'Deutsch', value: 'DE'},
        {label: 'Englisch', value: 'EN'}
      ]
    };
    var gender = {
      controlType: 'container',
      key: 'pd-c-gender',
      config: []
    };
    var company = {
      controlType: 'container',
      key: 'pd-c-company',
      config: []
    };
    var name = {
      controlType: 'container',
      key: 'pd-c-name',
      config: []
    };
    var bottom = {
      controlType: 'container',
      key: 'pd-c-bottom',
      config: []
    };
    var container = {
      controlType: 'container',
      key: 'pd-c-gender',
      config: [],
      valueChangeSubscriptions: [{name: "isRendered", controls: ['isCompany'], params: [true]}]
    };
    var firstName = {
      controlType: "textbox",
      type: "text",
      key: 'firstName',
      label: 'Firstname',
      formatterParser: [
        {name: 'toCapitalized', target: 2}
      ]
    };
    var lastName = {
      controlType: "textbox",
      type: "text",
      key: 'lastName',
      label: 'Lastname'
    };
    company.config.push(isCompany);
    company.config.push(companyName);
    name.config.push(container);
    name.config.push(salutation);
    name.config.push(title);
    name.config.push(firstName);
    name.config.push(lastName);
    bottom.config.push(geb);
    bottom.config.push(besch);
    bottom.config.push(main_lang);
    var personalData = {
      controlType: 'formGroup',
      key: "personalData",
      label: "Personal Data",
      config: []
    };
    personalData.config.push(company);
    personalData.config.push(name);
    personalData.config.push(bottom);
    return personalData;
  };
  FormConfigService.prototype.getAddressDataConfig = function () {
    var googleAddressSearch = {
      label: "Google Address Search",
      controlType: 'textbox',
      key: "googleAddressSearch"
    };
    var houseNumber = {
      label: 'Housenumber',
      wrapperClass: ['col-sm-6'],
      controlType: 'textbox',
      key: 'house_number',
      validator: [
        {name: "required"}
      ]
    };
    var street = {
      label: 'Street',
      wrapperClass: ['col-sm-6'],
      controlType: 'textbox',
      key: 'street',
      formatterParser: [
        {name: 'toCapitalized', target: 2}
      ],
      validator: [
        {name: "required"}
      ]
    };
    var zipCode = {
      label: 'Zip Code',
      wrapperClass: ['col-sm-3'],
      controlType: 'textbox',
      key: 'zip_code',
      validator: [
        {name: "required"}
      ]
    };
    var city = {
      label: 'city',
      wrapperClass: ['col-sm-5'],
      controlType: 'textbox',
      key: 'city',
      formatterParser: [
        {name: 'toCapitalized', target: 2}
      ],
      validator: [
        {name: "required"}
      ]
    };
    var country = {
      label: 'Country',
      wrapperClass: ['col-sm-4'],
      controlType: 'select',
      key: 'country',
      formState: "DE",
      options: [
        {label: 'Deutsch', value: 'DE'},
        {label: 'Englisch', value: 'EN'},
        {label: 'Französisch', value: 'FR'},
        {label: 'Italienisch', value: 'IT'}
      ],
      validator: [
        {name: "required"}
      ]
    };
    var row0 = {
      controlType: 'container',
      key: 'ad-row0',
      config: []
    };
    row0.config.push(googleAddressSearch);
    var row1 = {
      controlType: 'container',
      key: 'ad-row1',
      config: []
    };
    row1.config.push(houseNumber);
    row1.config.push(street);
    var row2 = {
      controlType: 'container',
      key: 'ad-row2',
      config: []
    };
    row2.config.push(zipCode);
    row2.config.push(city);
    row2.config.push(country);
    var addressData = {
      controlType: 'formGroup',
      key: "addressData",
      label: "Address Data",
      config: []
    };
    addressData.config.push(row0, row1, row2);
    return addressData;
  };
  FormConfigService.prototype.getGenericElementConfig = function () {
    var formConfig = {
      config: [
        /**/
        // controlType
        {
          controlType: 'select',
          key: 'controlType',
          label: 'Control Type',
          helpText: "This value is used to identify the control type  of the element",
          options: [
            {value: 'textbox', label: 'Textbox'},
            {value: 'select', label: 'Select'},
            {value: 'multiselect', label: 'Multiselect'},
            {value: 'checkbox', label: 'Checkbox'},
            {value: 'checkboxInline', label: 'Checkbox Inline'},
            {value: 'radioInline', label: 'Radio Inline'},
            {value: 'textarea', label: 'Textarea'},
            {value: 'button', label: 'Button'}
          ],
        },
        // type
        {
          controlType: 'select',
          key: 'type',
          label: 'type',
          helpText: "This value is used in the type attribute of the element",
          options: [
            {value: 'text', label: 'Text'},
            {value: 'number', label: 'Number'},
            {value: 'button', label: 'Button'},
            {value: 'submit', label: 'Submit'},
            {value: 'reset', label: 'Reset'}
          ],
          valueChangeSubscriptions: [
            /**/ {
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
          inputType: "text",
          validator: [{name: 'required'}]
        },
        // label
        {
          controlType: 'textbox',
          key: 'label',
          label: 'Label',
          placeholder: "The element label",
          helpText: "This value is used in the lable of the element",
          inputType: 'text'
        },
        // placeholder
        {
          controlType: 'textbox',
          key: 'placeholder',
          label: 'Placeholder',
          placeholder: "The element placeholder",
          helpText: "This value is used in the placeholder of the element",
          inputType: 'text',
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
          valueChangeSubscriptions: [{
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
          inputType: 'text'
        },
        //submit button
        {
          controlType: 'button',
          key: 'submit-button',
          label: 'Update',
          inputType: 'submit'
        },
        //reset button
        {
          controlType: 'button',
          key: 'reset-button',
          label: 'Reset',
          inputType: 'reset'
        }
      ]
    };
    return formConfig;
  };
  FormConfigService.prototype.getCampaign = function () {
    var formConfig = {
      config: [
        {
          controlType: 'textbox',
          key: 'housenr',
          label: 'House Nummer',
          placeholder: "House Nummer hier",
          inputType: 'text'
        },
        {
          controlType: 'textbox',
          key: 'strasse',
          label: 'Strasse',
          placeholder: "Strassenname hier",
          inputType: 'text'
        },
        {
          controlType: 'textbox',
          key: 'plz',
          label: 'PLZ',
          placeholder: "PLZ hier",
          inputType: 'text'
        },
        {
          controlType: 'textbox',
          key: 'stadt',
          label: 'Stadt',
          placeholder: "Stadt hier",
          inputType: 'text'
        },
        {
          controlType: 'textbox',
          key: 'email',
          label: 'Email',
          placeholder: "Email hier",
          inputType: 'mail',
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
          inputType: 'tel',
        },
        {
          controlType: 'textbox',
          key: 'mobilenummer',
          label: 'Mobilenummer',
          inputType: 'tel',
        },
        {
          controlType: 'select',
          label: 'Sponsorships',
          options: [
            {label: 'hund', value: 'Hund'},
            {label: 'katze', value: 'Katze'},
          ],
        },
        {
          controlType: 'radio',
          key: 'additional_amount',
          label: 'Anderer Betrag',
          options: [
            {label: '100', value: '100'},
            {label: '200', value: '200'},
          ],
        },
        {
          controlType: 'textbox',
          key: 'monatsbetrag',
          label: 'Monatsbetrag',
          inputType: 'number',
        },
        {
          controlType: 'textbox',
          key: 'jahresbetrag',
          label: 'Jahresbetrag',
          inputType: 'number',
        },
        {
          controlType: 'select',
          key: 'zahlungs_interval',
          label: 'Zahlungs Interval',
          helpText: "Intervall der Zahlung",
          options: [
            {label: 'monatlich', value: 'monatlich'},
            {label: 'vierteljährlich', value: 'vierteljährlich'},
            {label: 'halbjährlich', value: 'halbjährlich'},
            {label: 'jährlich', value: 'jährlich'}
          ],
          valueChangeSubscriptions: [
            /**/ {
              controls: ['sponsorship'], name: "filteredOptions",
              params: [
                {key: 'hund', options: ['monatlich', 'jährlich']},
                {key: 'katze', options: ['vierteljährlich', 'halbjährlich']}
              ]
            }
          ]
        }
      ]
    };
    return formConfig;
  };
  //ALL
  FormConfigService.prototype.getAllFormConfigs = function () {
    var allConfigs = [
      {
        key: 0,
        label: 'Textbox',
        config: this.getTextboxConfig()
      },
      {
        label: 'Checkbox',
        key: 1,
        config: this.getCheckboxConfig(),
      },
      {
        label: 'Radio',
        key: 2,
        config: this.getRadioConfig()
      },
      {
        label: 'Select',
        key: 3,
        config: this.getSelectConfig()
      },
      {
        label: 'Textarea',
        key: 4,
        config: this.getTextareaConfig()
      },
      {
        label: 'Buttons',
        key: 5,
        config: this.getButtonConfig()
      },
      {
        label: 'formGroup Test',
        key: 6,
        config: this.getFormGroupConfig()
      },
      {
        label: 'validation Test',
        key: 7,
        config: this.getValidationConfig()
      },
      {
        label: 'FormatterParser',
        key: 8,
        config: this.getFormatterParserConfig()
      },
      {
        label: "generic Item",
        key: 9,
        config: this.getGenericElementConfig()
      },
      {
        label: 'Personal Data',
        key: 10,
        config: this.getPersonalDataConfig()
      },
      {
        label: 'Address Data',
        key: 11,
        config: this.getAddressDataConfig()
      },
      {
        label: 'Donut Campaign',
        key: 11,
        config: this.getCampaign()
      },
    ];
    return allConfigs;
  };
  ////////////////////////////////////////////////
  FormConfigService.prototype._getRandItem = function (key, controlType, inputType, label, validator, asyncValidator, placeholder, helpText, config) {
    controlType = controlType || this._getRandControlType();
    inputType = inputType || this._getRandInputType(controlType);
    label = label || '';
    config = [];
    var numOfValidators = (controlType == 'formGroup') ? 1 : null;
    validator = validator || this._getRandInputValidator(numOfValidators);
    asyncValidator = asyncValidator || this._getRandInputAsyncValidator(numOfValidators);
    placeholder = placeholder || '';
    helpText = helpText || '';
    var item = {
      key: key,
      label: label,
      placeholder: placeholder,
      helpText: helpText,
      controlType: controlType,
      inputType: inputType,
      validator: validator,
      asyncValidator: asyncValidator,
      config: config
    };
    return item;
  };
  FormConfigService.prototype._getRandControlType = function () {
    var controlType;
    return this._getRandArrayItem(FormConfigService_1.CONTROL_TYPES).value;
  };
  FormConfigService.prototype._getRandInputType = function (controlType) {
    var set;
    switch (controlType) {
      case 'select':
      case 'textarea':
        set = [];
        break;
      case 'textbox':
        set = FormConfigService_1.TEXTBOX_TYPES;
        break;
      case 'button':
        set = FormConfigService_1.BUTTON_TYPES;
        break;
      default:
        set = FormConfigService_1.INPUT_TYPES;
    }
    return this._getRandArrayItem(set).value;
  };
  FormConfigService.prototype._getRandTextboxType = function () {
    var controlType;
    return this._getRandArrayItem(FormConfigService_1.TEXTBOX_TYPES).value;
  };
  FormConfigService.prototype._getRandButtonType = function () {
    return this._getRandArrayItem(FormConfigService_1.BUTTON_TYPES).value;
  };
  FormConfigService.prototype._getRandInputValidator = function (count) {
    var _this = this;
    return this._getArrayOfRandItemCount(function () {
      return _this._getRandArrayItem(FormConfigService_1.INPUT_VALIDATORS).value;
    }, count);
  };
  FormConfigService.prototype._getRandInputAsyncValidator = function (count) {
    var _this = this;
    return this._getArrayOfRandItemCount(function () {
      return _this._getRandArrayItem(FormConfigService_1.INPUT_ASYNC_VALIDATORS).value;
    }, count);
  };
  FormConfigService.prototype._getArrayOfRandItemCount = function (cb, count) {
    count = count || Math.floor((Math.random() + 1) * 10);
    var validators = [];
    for (var i = 0; i < count; i++) {
      validators.push(cb());
    }
    return validators;
  };
  FormConfigService.prototype._getRandArrayItem = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };
  return FormConfigService;
}());
FormConfigService.TEXTBOX_TYPES = [
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
FormConfigService.BUTTON_TYPES = [
  {value: 'button', name: 'Button'},
  {value: 'reset', name: 'Reset'},
  {value: 'submit', name: 'Submit'}
];
FormConfigService.INPUT_TYPES = [].concat(FormConfigService_1.TEXTBOX_TYPES, FormConfigService_1.BUTTON_TYPES);
FormConfigService.CONTROL_TYPES = [
  {value: 'textbox', name: 'Textbox'},
  {value: 'select', name: 'Select'},
  {value: 'checkbox', name: 'Checkbox'},
  {value: 'radio', name: 'Radio'},
  {value: 'textarea', name: 'Textarea'},
  {value: 'button', name: 'Button'},
  {value: 'formGroup', name: 'FormGroup'},
  {value: 'formArray', name: 'FormArray'},
  {value: 'container', name: 'Container'}
];
FormConfigService.INPUT_VALIDATORS = [
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
FormConfigService.INPUT_ASYNC_VALIDATORS = [
  {value: {name: 'wait2SecToValidateRequired'}, name: 'Wait 2 Sec To Validate Required'},
];
FormConfigService = FormConfigService_1 = __decorate([
  core_1.Injectable()
], FormConfigService);
exports.FormConfigService = FormConfigService;
var FormConfigService_1;
//# sourceMappingURL=form-config.service.js.map

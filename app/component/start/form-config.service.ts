import {Injectable} from "@angular/core";

@Injectable()
export class FormConfigService {

  getFormGroupTestConfig() {

    let conf = createFgConfig(2);

    conf.push( {
      controlType: 'textbox',
      type: "text",
      key: "TextboxFg" + 3,
      label: "Textbox Item of type url"
    });

    return conf;
    //////////////////////////////////

    function createFgConfig(count:any): any {

      let conf = [
        {
          controlType: 'textbox',
          type: "text",
          key: "TextboxFg" + count,
          label: "Textbox Item of type url"
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
        validator: (count > 0)?{name: 'controlMatch', params:[["fG" + count,"TextboxFg" + count], ["fG" + (count-1),"TextboxFg" + (count-1)]]}:{}
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
          {name: "validateEmail"}
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
          {name: "validateEmail"}
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
          {name: 'validateEmail'},
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

}

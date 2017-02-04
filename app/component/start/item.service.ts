import {Injectable}       from '@angular/core';

@Injectable()
export class ItemService {
  // Todo: get from a remote source of form metadata
  // Todo: make asynchronous
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
    let demoset1: Array<any>= [

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
        label: 'Checkbox item',
      },
      //radio
      {
        controlType: 'radio',
        key: 'radioItem',
        label: 'Radio item',
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
        label: 'Select item',
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
      }
    ];
    return demoset1;
  }

  getGenericElement() {

    let genericElementConfig: Array<any> = [
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
          {key: 'sumbit', value: 'Submit'},
          {key: 'reset', value: 'Reset'},
          {key: 'button', value: 'Button'}
        ],
      },
      // type
      {
        controlType: 'select',
        key: 'type',
        label: 'type',
        helpText: "This value is used in the type attribute of the element",
        type: 'text',
        options: [
          {key: 'text', value: 'text'},
          {key: 'number', value: 'number'},
          {key: 'select', value: 'select'},
          {key: 'checkbox', value: 'checkbox'},
          {key: 'radio', value: 'Radio'},
          {key: 'textarea', value: 'Textarea'},
          {key: 'sumbit', value: 'Submit'},
          {key: 'reset', value: 'Reset'},
          {key: 'button', value: 'Button'}
        ],
      },
      //key
      {
        controlType: 'textbox',
        key: "key",
        label: "Key",
        placeholder: "The element key",
        //helpText: "This value is used in the id and name attribute of the element",
        type: "text"
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
        type: 'text'
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
      //button
       {
        controlType: 'button',
        key: 'submit-button',
        label: 'Update',
        type: 'submit'
      }
      /**/
    ];
    return genericElementConfig;
  }

}

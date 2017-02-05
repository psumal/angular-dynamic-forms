import {Component, OnInit, Input, Output, OnChanges, EventEmitter} from '@angular/core';
import {ItemService} from "./item.service";
import {IStarRatingOnClickEvent} from "angular-star-rating/src/star-rating-struct";
import {IStarRatingCompBindings} from "angular-star-rating/src//star-rating-struct";
import {IDynamicFormOnPayLoadChangeEvent} from "../../common/dynamic-form/dynamic-form-scruct";
import {ItemBase} from "../../common/dynamic-form/item/item-base";
import {ItemControlService} from "../../common/dynamic-form/item/item.service";
import {TextboxItem} from "../../common/dynamic-form/item/item-textbox";
import {FormGroup} from "@angular/forms";
import {FormGroupItem} from "../../common/dynamic-form/item/formGroup/formGroup-base";

@Component({
  moduleId: module.id,
  selector: 'start',
  templateUrl: 'start.component.html',
})
export class StartComponent implements OnInit, OnChanges {

  demoSelectionForm: {};
  demoForms: Array<any>;

  formName: string;
  formItems: Array<any>;
  formModel: {};

  dynamicItems:any[] = [];


  starRatingConfig: IStarRatingCompBindings = {
    rating: 4,
    numOfStars: 7,
    size: "large",
    speed: "noticeable",
    labelPosition: "left",
    starType: "svg"
  };

  constructor(protected service: ItemService) {

    this.formItems = service.getGenericElement();
    this.formModel = this.starRatingConfig;
    this.demoForms = [
      {
        value: 'Star Rating Config',
        key: {
          formItems: service.getConfigForm(),
          formModel: {
            rating: 4,
            numOfStars: 7,
            size: "large"
          }
        }
      },
      {
        value: 'KitchenSink',
        key: {
          forItems: service.getKitchenSink()
        }
      },
      {
        value: 'Generic form',
        key: {
          forItems: service.getGenericElement()
        }
      }
    ];

  }

  ngOnInit() {
  }

  ngOnChanges() {
  }

  /*DEMO SELECT*/
  onTemplateFromModelChange($event: {model: any}) {
    console.log('onTemplateFromModelChange', $event.model.demo.formItems);

    if ('model' in $event && 'demo' in $event.model) {

      if ('formName' in $event.model.demo) {
        this.formName = $event.model.demo.formName;
      }

      if ('formItems' in $event.model.demo) {
        this.formItems = $event.model.demo.formItems;
      }

      if ('formModel' in $event.model.demo) {
        this.formModel = $event.model.demo.formModel;
      }

    }
  }

  /*DYNAMIC FORM COMPONENT*/
  onPayloadChange($event: {}) {
    /*console.log('onPayloadChange $event', $event['payLoad']);
    let item: ItemBase<any> = $event['payLoad'];//ItemControlService.createFormItem($event['payLoad']);
    if(item) {
      console.log("generated item: ", item, this.dynamicItems.concat(item, this.dynamicItems));
      this.dynamicItems = this.dynamicItems.concat(item, this.dynamicItems);
    }*/
  }

  onSubmitted($event: {}) {
    console.log('onSubmitted $event', $event['payLoad']);
    let item: ItemBase<any>|FormGroupItem = ItemControlService.createFormItem($event['payLoad']);
    if(item) {
      console.log("generated item: ", item);
      this.dynamicItems = this.dynamicItems.concat(item, []);
    }
  }

  /*STAR RATING COMPONENT*/
  onClick($event: IStarRatingOnClickEvent) {
    console.log('onClick $event', $event);
  }

  onRatingChange($event: IStarRatingOnClickEvent) {
    console.log('onRatingChange $event', $event);
    //create new ref
    this.starRatingConfig.rating = $event.rating;
    //this.starRatingConfig =  JSON.parse(JSON.stringify(this.starRatingConfig));
  }

}

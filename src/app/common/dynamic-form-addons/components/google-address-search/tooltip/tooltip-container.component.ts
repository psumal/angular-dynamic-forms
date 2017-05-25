import {TooltipService} from "./tooltip.service";
import {Component, Input} from "@angular/core";
@Component({
  selector: 'tooltip-container',
  template: `
    <div class="tooltip-container">
      TID: {{id}}
      <pre>{{tooltip | json}}</pre>
      <agm-map
        *ngIf="tooltip"
        class="my-tooltip"
        style="height:300px; width:300px;"
        [latitude]="latitude"
        [longitude]="longitude"
        [zoom]="zoom">
      </agm-map>
    </div>
  `
})
export class TooltipContainerComponent {

  @Input('tooltipId') private _id: string;

  private _latitude: number = 0;
  private _longitude: number = 0;
  private _zoom: number = 12;

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get latitude(): number {
    return this._latitude || 0;
  }

  set latitude(value: number) {
    this._latitude = value;
  }

  get longitude(): number {
    return this._longitude || 0;
  }

  set longitude(value: number) {
    this._longitude = value;
  }

  get zoom(): number {
    return this._zoom || 12;
  }

  set zoom(value: number) {
    this._zoom = value;
  }


  constructor(private tooltipService: TooltipService) {

  }

  get ref(): any {
    return 'ref' in this.tooltip ? this.tooltip.ref : null;
  }

  get title(): any {
    return 'title' in this.tooltip ? this.tooltip.title : null;
  }

  get tooltip(): any {
    return this.tooltipService.components.find(i => i.id == this._id)
  }

}

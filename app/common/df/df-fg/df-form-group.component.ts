import {Component, Input} from '@angular/core'

@Component({
  selector: 'df-fg',
  template: `
    <ul>
      <li *ngFor="#property of getKeys()">
        {{property}}: 
        <span *ngIf="!isObject(property)">
          {{getValue(property)}}
        </span>
        <span *ngIf="isObject(property)">
          <object-view [object]="getValue(property)"></object-view>
        </span>
      </li>
    </ul>
  `,
  directives: [DFFormGroupComp]
})
export class DFFormGroupComp {
  @Input() object: any;

  private getKeys(): string[] {
    return Object.keys(this.object);
  }

  private getValue(property: string): any {
    return this.object[property];
  }

  private isObject(property: string): boolean {
    const value = this.getValue(property);
    return !Array.isArray(value) && typeof value === 'object';
  }
}

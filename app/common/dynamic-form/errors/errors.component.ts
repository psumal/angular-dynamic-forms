// my-component.component.ts
import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'item-error',
  template: `
    <div class="item-error">
      <ng-content></ng-content>
    </div>
  `
})
export class ItemErrorComponent {

}

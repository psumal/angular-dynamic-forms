import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesService } from './messages.service';
import { MessagesComponent } from './messages.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MessagesComponent],
  exports: [MessagesComponent]
})
export class MessagesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MessagesModule,
      providers: [
        MessagesService
      ]
    }
  }
}

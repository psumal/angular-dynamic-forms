import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'
import {BrowserModule} from '@angular/platform-browser'
import {RouterModule, Routes} from '@angular/router'

import {AppComponent} from './app.component'
import {StartModule} from './component/start/start.module'
import {CoreModule} from './core/core/core.module'
import {DynamicFormElementModule} from './modules/dymanic-form-element/dynamic-form-element.module'
import {DynamicFormElementAddonModule} from './modules/dynamic-form-addons/dynamic-form-addons.module'
import {UiBasicModule} from './modules/ui-basic/ui-basic.module'
import {ButtonComponentsComponent} from './pages/button-components/button-components.component'
import {ButtonComponentsResolver} from './pages/button-components/button-components.resolver'
import {CheckboxComponentsComponent} from './pages/checkbox-components/checkbox-components.component'
import {CheckboxComponentsResolver} from './pages/checkbox-components/checkbox-components.resolver'
import {FormArrayComponentsComponent} from './pages/formarray-components/formarray-components.component'
import {FormGroupComponentsComponent} from './pages/formgroup-components/formgroup-components.component'
import {FormGroupComponentsResolver} from './pages/formgroup-components/formgroup-components.resolve'
import {RadioComponentsComponent} from './pages/radio-components/radio-components.component'
import {RadioComponentsResolver} from './pages/radio-components/radio-components.resolver'
import {SelectComponentsComponent} from './pages/select-components/select-components.component'
import {SelectComponentsResolver} from './pages/select-components/select-components.resolver'
import {TextareaComponentsComponent} from './pages/textarea-components/textarea-components.component'
import {TextareaComponentsResolver} from './pages/textarea-components/textarea-components.resolver'
import {TextboxComponentsResolver} from './pages/textbox-components/textbox-component.resolver'
import {TextboxComponentsComponent} from './pages/textbox-components/textbox-components.component'
import {FormArrayComponentsResolver} from './pages/formarray-components/formarray-components.resolver';
import { ValidationComponentsComponent } from './pages/validation-components/validation-components.component'
import {ValidationComponentsResolver} from './pages/validation-components/validation-components.resolver'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'textbox-components',
    pathMatch: 'full'
  },
  {
    path: 'textbox-components',
    component: TextboxComponentsComponent,
    resolve: {
      formConfig: TextboxComponentsResolver
    }
  },
  {
    path: 'checkbox-components',
    component: CheckboxComponentsComponent,
    resolve: {
      formConfig: CheckboxComponentsResolver
    }
  },
  {
    path: 'radio-components',
    component: RadioComponentsComponent,
    resolve: {
      formConfig: RadioComponentsResolver
    }
  },
  {
    path: 'select-components',
    component: SelectComponentsComponent,
    resolve: {
      formConfig: SelectComponentsResolver
    }
  },
  {
    path: 'textarea-components',
    component: TextareaComponentsComponent,
    resolve: {
      formConfig: TextareaComponentsResolver
    }
  },
  {
    path: 'button-components',
    component: ButtonComponentsComponent,
    resolve: {
      formConfig: ButtonComponentsResolver
    }
  },
  {
    path: 'formgroup-components',
    component: FormGroupComponentsComponent,
    resolve: {
      formConfig: FormGroupComponentsResolver
    }
  },
  {
    path: 'formarray-components',
    component: FormArrayComponentsComponent,
    resolve: {
      formConfig: FormArrayComponentsResolver
    }
  },
  {
    path: 'validation-components',
    component: ValidationComponentsComponent,
    resolve: {
      formConfig: ValidationComponentsResolver
    }
  },
  {
    path: '**',
    redirectTo: 'textbox-components',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [
    BrowserModule, CommonModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    CoreModule,
    DynamicFormElementModule, UiBasicModule,
    DynamicFormElementAddonModule,
    StartModule
  ],
  declarations: [
    AppComponent,
    TextboxComponentsComponent,
    CheckboxComponentsComponent,
    RadioComponentsComponent,
    SelectComponentsComponent,
    TextareaComponentsComponent,
    ButtonComponentsComponent,
    FormGroupComponentsComponent,
    FormArrayComponentsComponent,
    ValidationComponentsComponent
  ],
  providers: [
    TextboxComponentsResolver,
    CheckboxComponentsResolver,
    RadioComponentsResolver,
    SelectComponentsResolver,
    TextareaComponentsResolver,
    ButtonComponentsResolver,
    FormGroupComponentsResolver,
    FormArrayComponentsResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

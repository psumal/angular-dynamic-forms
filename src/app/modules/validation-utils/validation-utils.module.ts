import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ValidationService } from './validation.service';
import { ValidatorWarningDirective } from './validator-warning.directive';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [ValidatorWarningDirective],
    exports: [ ValidatorWarningDirective, ReactiveFormsModule]
})
export class ValidationUtilsModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ValidationUtilsModule,
            providers: [
                ValidationService
            ]
        };
    }
}

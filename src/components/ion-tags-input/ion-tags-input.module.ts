/**
 * Created by hsuanlee on 2017/4/10.
 */
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, ModuleWithProviders, NO_ERRORS_SCHEMA } from '@angular/core';


import { IonTagsInput } from "./ion-tags-input";

/** @hidden */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [

    IonTagsInput
  ],
  exports: [

    IonTagsInput
  ], 
  schemas: [NO_ERRORS_SCHEMA]
})
export class IonTagsInputModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: IonTagsInputModule, providers: []
    };
  }
}

import { Component, forwardRef, EventEmitter, Output, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { AlertController, ToastController } from "ionic-angular";
//import {noop} from "@angular/core/src/linker/view_utils";
//import * as _ from "lodash";
/*
  Generated class for the TagInput component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/

@Component({
  selector: 'tags-input',
  template: '<button type="button" *ngFor="let value of values; let i=index" ion-button item-right icon-right (click)="removeItem(i)">' +
  '{{ value }}' +
  '&nbsp;' +
  '<ion-icon name="close"></ion-icon>' +
  '</button>' +
  '<button type="button" icon-only ion-button icon-left outline (click)="addItem()" [disabled]="isDisabled">' +
  '<ion-icon name="add"></ion-icon>' +
  //'{{ buttonLabel }}' +
  '</button>',

  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TagsInputComponent),
    multi: true
  }],
})
export class TagsInputComponent implements ControlValueAccessor {

  //@Output() onTagAdded:EventEmitter<any> = new EventEmitter<any>();
  //@Output() onTagRemoved:EventEmitter<any> = new EventEmitter<any>();
  @Input() maxTags: number;
  //@Input() buttonLabel: string = 'Add';
  @Input() buttonLabel: string = '';
  @Input() alertTitleLabel: string;
  @Input() alertInputPlaceholder: string;
  @Input() alertButtonLabel: string;
  @Input() wordLengthRestrictionMsg: string;
  @Input() duplicatesRestrictionMsg: string;
  @Input() maxWordLength: number;
  @Input() allowDuplicates: boolean = false;

  //private onTouchedCallback: () => void = noop;
  // private onChangeCallback: (_: any) => void = noop;

  public values: Array<any> = [];
  public isDisabled: boolean = false;

  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController) { }

  writeValue(value: Array<any>): void {
    this.values = value || [];
    /*    this.values.forEach((currentValue, index) => {
          currentValue.index = index;
        });*/
  }

  registerOnChange(fn: (_: Array<any>) => void): void {
    //  this.onChangeCallback = fn
  }

  registerOnTouched(fn: () => void): void {
    //  this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  public addItem(): void {
    this.alertCtrl.create({
      title: this.alertTitleLabel || 'Adicionar tag',
      inputs: [
        {
          name: 'name',
          placeholder: this.alertInputPlaceholder || 'Tag'
        },
      ],
      buttons: [
        {
          text: this.alertButtonLabel || 'OK',
          handler: (data: any) => {
            //data.index = this.values.length;
            if (data.name && !this.checkDuplicatesRestriction(data.name) && !this.checkMaxWordLengthRestriction(data.name)) {
              this.addValue(data.name);
              return true
            }
            return false
          }
        }
      ]
    }).present();
  }

  private checkMaxItemsRestriction(index: number): boolean {
    if (index >= this.maxTags) {
      this.setDisabledState(true);
      return true
    } else {
      this.setDisabledState(false);
      return false
    }
  }

  private addValue(name: any) {
    this.values.push(name);
    // this.onTagAdded.emit(name);
    this.checkMaxItemsRestriction(this.values.length)
  }

  private checkDuplicatesRestriction(name: string): boolean {
    let duplicatesRestrictionError = this.toastCtrl.create({
      message: this.duplicatesRestrictionMsg || 'Uma tag de mesmo nome já foi informada.',
      duration: 3000
    });

    if (!this.allowDuplicates) {
      var qtd = this.values.length;

      for (var i = 0; i < qtd; i++) {
        if (this.values[i] == name) {
          duplicatesRestrictionError.present();
          return true;
        }
      }
    }

    return false;
  }

  private checkMaxWordLengthRestriction(name: string): boolean {
    let maxWordLengthRestrictionError = this.toastCtrl.create({
      message: this.wordLengthRestrictionMsg || `Somente são permitidos ${this.maxWordLength} caracteres.`,
      duration: 3000
    });

    if (name.length > this.maxWordLength) {
      maxWordLengthRestrictionError.present();
      return true
    }
    return false
  }

  public removeItem(index: number): void {
    //this.onTagRemoved.emit(this.values[index]);
    this.values.splice(index, 1);
    this.checkMaxItemsRestriction(index)
  }

}
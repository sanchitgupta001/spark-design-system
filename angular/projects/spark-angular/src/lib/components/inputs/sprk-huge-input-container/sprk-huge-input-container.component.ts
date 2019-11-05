import { Component, ContentChild, Input, OnInit } from '@angular/core';
import { uniqueId } from 'lodash';
import { SprkFieldErrorDirective } from '../../../directives/inputs/sprk-field-error/sprk-field-error.directive';
import { SprkInputDirective } from '../../../directives/inputs/sprk-input/sprk-input.directive';
import { SprkLabelDirective } from '../../../directives/inputs/sprk-label/sprk-label.directive';

@Component({
  selector: 'sprk-huge-input-container',
  template: `
    <div [ngClass]="getClasses()">
      <ng-content select="[sprkInput]"></ng-content>
      <ng-content select="[sprkLabel]"></ng-content>
      <ng-content select="[sprk-select-icon]"></ng-content>
      <ng-content select="sprk-selection-item-container"></ng-content>
      <ng-content select="[sprkHelperText]"></ng-content>
      <ng-content select="[sprkFieldError]"></ng-content>
    </div>
  `
})
export class SprkHugeInputContainerComponent implements OnInit {
  @Input()
  additionalClasses: string;
  @Input()
  iconContainerClasses: string;

  @ContentChild(SprkLabelDirective, { static: true })
  label: SprkLabelDirective;
  @ContentChild(SprkInputDirective, { static: true })
  input: SprkInputDirective;
  @ContentChild(SprkFieldErrorDirective, { static: true })
  error: SprkFieldErrorDirective;

  id = uniqueId();
  input_id = `input_${this.id}`;
  error_id = `error_${this.id}`;

  /**
   * @ignore
   */
  getClasses(): string {
    const classArray: string[] = [
      'sprk-b-InputContainer',
      'sprk-b-InputContainer--huge'
    ];

    if (this.additionalClasses) {
      this.additionalClasses.split(' ').forEach(className => {
        classArray.push(className);
      });
    }
    return classArray.join(' ');
  }

  ngOnInit(): void {
    if (this.label && this.input) {
      this.label.ref.nativeElement.setAttribute('for', this.input_id);
      this.input.ref.nativeElement.id = this.input_id;
    }
    if (this.input && this.error) {
      this.input.ref.nativeElement.setAttribute(
        'aria-describedby',
        this.error_id
      );
      this.error.ref.nativeElement.id = this.error_id;
    }
  }
}

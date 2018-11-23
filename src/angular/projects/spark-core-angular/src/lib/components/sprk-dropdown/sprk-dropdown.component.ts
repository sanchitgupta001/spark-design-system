import {
  Component,
  Input,
  Output,
  ElementRef,
  HostListener,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'sprk-dropdown',
  template: `
    <a
      [ngClass]="getTriggerClasses()"
      aria-haspopup="true"
      href="#nogo"
      (click)="toggle($event)"
      role="combobox"
    >
      {{ triggerText }}
      <sprk-icon [iconType]="triggerIconType"></sprk-icon>
    </a>
    <div [ngClass]="getClasses()" *ngIf="isOpen">
      <div class="sprk-c-Dropdown__header" *ngIf="title">
        <h2 class="sprk-c-Dropdown__title sprk-b-TypeDisplayEight">
          {{ title }}
        </h2>
      </div>
      <ul class="sprk-c-Dropdown__links">
        <li
          *ngFor="let choice of choices; let i = index"
          [attr.data-sprk-dropdown-choice-index]="i"
          (click)="choiceClick($event)"
        >
          <div *ngIf="choice.content; then: content; else: link"></div>
          <ng-template #link>
            <a
              [attr.data-sprk-dropdown-value]="choice.value"
              href=""
              [ngClass]="{
                'sprk-c-Dropdown__link': true,
                'sprk-c-Dropdown__link--active': choice.active
              }"
              role="option"
              >{{ choice.text }}
            </a>
          </ng-template>
          <ng-template #content>
            <a
              [attr.data-sprk-dropdown-value]="choice.value"
              href=""
              [ngClass]="{
                'sprk-c-Dropdown__link': true,
                'sprk-c-Dropdown__link--active': choice.active
              }"
              role="option"
            >
              <p class="sprk-b-TypeBodyOne">{{ choice.content.title }}</p>
              <p>{{ choice.content.infoLine1 }}</p>
              <p>{{ choice.content.infoLine2 }}</p>
            </a>
          </ng-template>
        </li>
      </ul>
      <ng-content select="[sprkDropdownFooter]"></ng-content>
    </div>
  `
})
export class SparkDropdownComponent {
  @Input()
  dropdownType = 'base';
  @Input()
  additionalClasses: string;
  @Input()
  additionalTriggerClasses: string;
  @Input()
  idString: string;
  @Input()
  isOpen = false;
  @Input()
  title: string;
  @Input()
  choices: object[];
  @Input()
  triggerIconType: string;
  @Input()
  triggerText: string;
  @Output()
  choiceMade: EventEmitter<string> = new EventEmitter();

  constructor(public ref: ElementRef) {}

  toggle(event): void {
    event.preventDefault();
    this.isOpen = !this.isOpen;
  }

  @HostListener('document:click', ['$event'])
  onClick(event): void {
    if (!this.ref.nativeElement.contains(event.target)) {
      this.hideDropdown();
    }
  }

  @HostListener('document:focusin', ['$event'])
  onFocusin(event): void {
    if (!this.ref.nativeElement.contains(event.target)) {
      this.hideDropdown();
    }
  }

  choiceClick(event) {
    event.preventDefault();
    this.clearActiveChoices();
    const choiceIndex = event.currentTarget.getAttribute(
      'data-sprk-dropdown-choice-index'
    );
    const clickedChoice = this.choices[choiceIndex];
    if (this.dropdownType !== 'simple') {
      this.setActiveChoice(event);
      this.updateTriggerText(event);
    }
    this.hideDropdown();
    this.choiceMade.emit(clickedChoice['value']);
  }

  setActiveChoice(event): void {
    const choiceIndex = event.currentTarget.getAttribute(
      'data-sprk-dropdown-choice-index'
    );
    this.choices[choiceIndex]['active'] = true;
  }

  updateTriggerText(event): void {
    const choiceIndex = event.currentTarget.getAttribute(
      'data-sprk-dropdown-choice-index'
    );
    this.triggerText = this.choices[choiceIndex]['value'];
  }

  clearActiveChoices(): void {
    if (this.choices.length !== 0) {
      this.choices.forEach((choice: object) => {
        if (choice['active']) {
          choice['active'] = false;
        }
      });
    }
  }

  hideDropdown(): void {
    this.isOpen = false;
  }

  getClasses(): string {
    const classArray: string[] = ['sprk-c-Dropdown'];

    if (this.additionalClasses) {
      this.additionalClasses.split(' ').forEach(className => {
        classArray.push(className);
      });
    }

    return classArray.join(' ');
  }

  getTriggerClasses(): string {
    const classArray: string[] = ['sprk-b-Link', 'sprk-b-Link--plain'];

    if (this.additionalTriggerClasses) {
      this.additionalTriggerClasses.split(' ').forEach(className => {
        classArray.push(className);
      });
    }

    return classArray.join(' ');
  }
}

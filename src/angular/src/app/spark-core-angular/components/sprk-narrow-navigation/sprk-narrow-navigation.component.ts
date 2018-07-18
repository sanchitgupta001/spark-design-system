import { Component, Input } from '@angular/core';

@Component({
  selector: 'sprk-narrow-navigation',
  template: `
    <nav role="navigation">
      <ul [ngClass]="getClasses()">
        <ng-content></ng-content>  
      </ul>
    </nav>`,
  styles: ['']
})

export class SparkNarrowNavigationComponent {
  @Input() additionalClasses: string;

  getClasses(): string {
    let classArray: Array<String> = [
      'sprk-c-Accordion',
      'sprk-c-Accordion--navigation',
      'sprk-b-List',
      'sprk-b-List--bare'
    ];

    if (this.additionalClasses) {
      this.additionalClasses.split(' ').forEach((className) => {
        classArray.push(className);
      })
    }

    return classArray.join(' ');
  }
}
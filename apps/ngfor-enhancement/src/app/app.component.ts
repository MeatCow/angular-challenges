import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgForEmpty } from './newNgFor.directive';

interface Person {
  name: string;
}

@Component({
  standalone: true,
  imports: [NgForEmpty],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; empty: emptyList; index as i">
      {{ person.name }} {{ i }}
    </div>
    <ng-template #emptyList>The list is empty !!</ng-template>
    <button (click)="clear()">Clear</button>
    <button (click)="add()">Add</button>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  persons: Person[] = [];

  clear() {
    this.persons = [];
  }

  add() {
    this.persons.push({ name: 'Matt' });
  }
}

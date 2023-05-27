import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Todo } from './todo.model';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'todo-item',
  standalone: true,
  template: `
    {{ todo.title }}
    <button (click)="update.emit(todo)">Update</button>
    <button (click)="delete.emit(todo.id)">Delete</button>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.25rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() update = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<number>();
}

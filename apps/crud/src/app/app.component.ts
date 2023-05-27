import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { randText } from '@ngneat/falso';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    <div *ngFor="let todo of todos$ | async">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
      <button (click)="delete(todo.id)">Delete</button>
    </div>
  `,
  styles: [
    `
      div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding-bottom: 0.5rem;
        gap: 0.25rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  todoService = inject(TodoService);

  todos$ = this.todoService.todos$;

  ngOnInit(): void {
    this.todoService.loadTodos();
  }

  update(todo: Todo) {
    this.todoService.updateTodo({ ...todo, title: randText() });
  }

  delete(id: number) {
    this.todoService.deleteTodo(id);
  }
}

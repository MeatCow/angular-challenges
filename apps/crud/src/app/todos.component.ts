import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { randText } from '@ngneat/falso';
import { TodoItemComponent } from './todo-item.component';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

@Component({
  standalone: true,
  imports: [CommonModule, TodoItemComponent],
  selector: 'app-root',
  template: `
    <todo-item
      *ngFor="let todo of todos$ | async"
      [todo]="todo"
      (update)="update($event)"
      (delete)="delete($event)">
    </todo-item>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent implements OnInit {
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

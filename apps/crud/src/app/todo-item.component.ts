import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { randText } from '@ngneat/falso';
import { LetDirective } from '@ngrx/component';
import { provideComponentStore } from '@ngrx/component-store';
import { TodoItemStore } from './todo-item.store';
import { Todo } from './todo.model';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, LetDirective, MatProgressSpinnerModule],
  template: `
    <ng-container *ngrxLet="vm$ as vm">
      {{ vm.todo.title }}
      <div class="btn-group">
        <button (click)="update(vm.todo)" [disabled]="vm.isChanging">
          Update
        </button>
        <mat-spinner *ngIf="vm.isUpdating" diameter="20" />
      </div>
      <div class="btn-group">
        <button (click)="delete(vm.todo.id)" [disabled]="vm.isChanging">
          Delete
        </button>
        <mat-spinner *ngIf="vm.isDeleting" diameter="20" />
      </div>
    </ng-container>
  `,
  providers: [provideComponentStore(TodoItemStore)],
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.25rem;
      }
      .btn-group {
        display: flex;
        gap: 3px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {
  private todoItemStore = inject(TodoItemStore);

  vm$ = this.todoItemStore.vm$;

  @Input()
  set todo(todo: Todo) {
    this.todoItemStore.setState({ todo, isDeleting: false, isUpdating: false });
  }

  update(todo: Todo) {
    this.todoItemStore.updateTodo({ ...todo, title: randText() });
  }

  delete(id: number) {
    this.todoItemStore.deleteTodo(id);
  }
}

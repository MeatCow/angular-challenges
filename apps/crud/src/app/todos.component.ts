import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LetDirective } from '@ngrx/component';
import { provideComponentStore } from '@ngrx/component-store';
import { TodoItemComponent } from './todo-item.component';
import { TodoStore } from './todos.store';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    TodoItemComponent,
    LetDirective,
  ],
  selector: 'app-todos',
  providers: [provideComponentStore(TodoStore)],
  template: `
    <ng-container *ngrxLet="vm$ as vm">
      <mat-spinner
        [diameter]="20"
        color="blue"
        *ngIf="vm.isLoading; else loaded">
      </mat-spinner>
      <ng-template #loaded>
        <div class="todo-container">
          <app-todo-item *ngFor="let todo of vm.todos" [todo]="todo">
          </app-todo-item>
        </div>
      </ng-template>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent {
  private todoStore = inject(TodoStore);

  vm$ = this.todoStore.vm$;
}

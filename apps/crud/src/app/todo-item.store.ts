import { Injectable, inject } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap, tap } from 'rxjs';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';
import { TodoStore } from './todos.store';

interface TodoItemState {
  todo: Todo;
  isUpdating: boolean;
  isDeleting: boolean;
}

@Injectable()
export class TodoItemStore extends ComponentStore<TodoItemState> {
  todoService = inject(TodoService);
  todoStore = inject(TodoStore);

  private readonly todo$ = this.select((s) => s.todo);
  private readonly isChanging$ = this.select(
    (s) => s.isDeleting || s.isUpdating
  );
  private readonly isUpdating$ = this.select((s) => s.isUpdating);
  private readonly isDeleting$ = this.select((s) => s.isDeleting);

  readonly vm$ = this.select({
    todo: this.todo$,
    isChanging: this.isChanging$,
    isUpdating: this.isUpdating$,
    isDeleting: this.isDeleting$,
  });

  readonly updateTodo = this.effect((todo$: Observable<Todo>) => {
    return todo$.pipe(
      tap(() => this.patchState({ isUpdating: true })),
      switchMap((todo) =>
        this.todoService.updateTodo(todo).pipe(
          tapResponse(
            (todo) => this.todoStore.updateTodo(todo),
            (error) => console.error(error)
          )
        )
      ),
      tap(() => this.patchState({ isUpdating: false }))
    );
  });

  readonly deleteTodo = this.effect((id$: Observable<number>) => {
    return id$.pipe(
      tap(() => this.patchState({ isDeleting: true })),
      switchMap((id) =>
        this.todoService.deleteTodo(id).pipe(
          tapResponse(
            () => this.todoStore.deleteTodo(id),
            (error) => console.error(error)
          )
        )
      ),
      tap(() => this.patchState({ isDeleting: false }))
    );
  });
}

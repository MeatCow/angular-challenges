import { Injectable, inject } from '@angular/core';
import {
  ComponentStore,
  OnStateInit,
  OnStoreInit,
  tapResponse,
} from '@ngrx/component-store';
import { pipe, switchMap, tap } from 'rxjs';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';
export interface TodoState {
  todos: Todo[];
  isLoading: boolean;
}

const initialState: TodoState = {
  isLoading: false,
  todos: [],
};

@Injectable()
export class TodoStore
  extends ComponentStore<TodoState>
  implements OnStateInit, OnStoreInit
{
  todoService = inject(TodoService);

  readonly todos$ = this.select((state) => state.todos);
  readonly isLoading$ = this.select((state) => state.isLoading);

  readonly vm$ = this.select(
    {
      todos: this.todos$,
      isLoading: this.isLoading$,
    },
    { debounce: true }
  );

  readonly loadTodos = this.effect<void>(
    pipe(
      tap(() => this.patchState({ isLoading: true })),
      switchMap(() =>
        this.todoService.loadTodos().pipe(
          tapResponse(
            (todos) => this.setState({ todos, isLoading: false }),
            (err) => console.error(err)
          )
        )
      )
    )
  );

  readonly updateTodo = this.updater((state, todo: Todo) => ({
    ...state,
    todos: state.todos.map((t) => (t.id === todo.id ? todo : t)),
  }));

  readonly deleteTodo = this.updater((state, id: number) => ({
    ...state,
    todos: state.todos.filter((t) => t.id !== id),
  }));

  ngrxOnStoreInit() {
    this.setState(initialState);
  }

  ngrxOnStateInit() {
    this.loadTodos();
  }
}

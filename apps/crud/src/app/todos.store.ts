import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Todo } from './todo.model';

export interface TodosState {
  todos: Todo[];
}

@Injectable({
  providedIn: 'root',
})
export class TodosStore extends ComponentStore<TodosState> {
  readonly todos$ = this.select((state) => state.todos);

  constructor() {
    super({
      todos: [],
    });
  }

  readonly updateTodo = this.updater((state, updatedTodo: Todo) => ({
    todos: state.todos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t)),
  }));

  readonly deleteTodo = this.updater((state, id: number) => ({
    todos: state.todos.filter((t) => t.id !== id),
  }));
}

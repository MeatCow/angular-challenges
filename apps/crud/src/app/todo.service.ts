import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TodoDataService } from './todo-data.service';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly todoDataService = inject(TodoDataService);
  private readonly todosSubject = new BehaviorSubject<Todo[]>([]);

  readonly todos$ = this.todosSubject.asObservable();

  loadTodos = () => {
    this.todoDataService.get().subscribe((todos) => {
      this.todosSubject.next(todos);
    });
  };

  updateTodo = (todo: Todo) => {
    this.todoDataService.put(todo).subscribe((todoUpdated: Todo) => {
      this.todosSubject.next(
        this.todosSubject.value.map((t) => {
          if (t.id !== todoUpdated.id) return t;
          return todoUpdated;
        })
      );
    });
  };

  deleteTodo = (id: number) => {
    this.todoDataService.delete(id).subscribe(() => {
      this.todosSubject.next(
        this.todosSubject.value.filter((t) => t.id !== id)
      );
    });
  };
}

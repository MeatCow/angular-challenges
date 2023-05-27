import { appConfig } from './app/app.config';

import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { TodosComponent } from './app/todos.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(TodosComponent, appConfig).catch((err) =>
  console.error(err)
);

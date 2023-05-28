import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'wrapFn', pure: true, standalone: true })
export class WrapFnPipe implements PipeTransform {
  transform<T, U extends unknown[]>(cb: (...args: U) => T, ...args: U) {
    return cb(...args);
  }
}

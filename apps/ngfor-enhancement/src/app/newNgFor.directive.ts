import {
  Directive,
  DoCheck,
  Input,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ standalone: true, selector: '[ngFor]' })
class NgForDirective<T> implements DoCheck {
  private viewContainerRef = inject(ViewContainerRef);
  private element = inject(TemplateRef<unknown>);

  @Input() ngForOf?: T[];

  @Input() ngForEmpty!: TemplateRef<unknown>;

  ngDoCheck(): void {
    this.viewContainerRef.clear();

    if (!this.ngForOf || this.ngForOf.length === 0) {
      this.viewContainerRef.createEmbeddedView(this.ngForEmpty);
      return;
    }

    for (const [index, element] of this.ngForOf.entries()) {
      this.viewContainerRef.createEmbeddedView(this.element, {
        $implicit: element,
        index,
      });
    }
  }

  static ngTemplateContextGuard<T>(
    directive: NgForDirective<T>,
    context: unknown
  ): context is NgForInterface<T> {
    return true;
  }
}

interface NgForInterface<T> {
  $implicit: T;
  index: number;
}

export { NgForDirective as NgForEmpty };

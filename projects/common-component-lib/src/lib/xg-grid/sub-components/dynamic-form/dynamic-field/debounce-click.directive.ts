import { Directive, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[gridDebounceClick]'
})
export class DebounceClickDirective implements OnInit {
  @Output() debounceClick = new EventEmitter();
  private clicks = new Subject();
  private subscription: Subscription;
  private aSuggestions: any[];

  constructor() { }

  ngOnInit() {
    this.subscription = this.clicks.pipe(
      debounceTime(1000)
    ).subscribe(e => this.debounceClick.emit(e));
  }

  @HostListener('change', ['$event'])
  clickEvent(event, rowData) {
    // event.preventDefault();
    // event.stopPropagation();
    this.clicks.next(event);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

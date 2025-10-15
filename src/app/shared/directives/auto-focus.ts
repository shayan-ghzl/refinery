import { Directive, ElementRef, inject, OnInit } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocus implements OnInit {

  elementRef = inject(ElementRef);

  ngOnInit(): void {
    this.focus();
  }

  focus() {
    (this.elementRef.nativeElement as HTMLInputElement).focus();
  }

}

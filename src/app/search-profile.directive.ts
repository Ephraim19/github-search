import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appSearchProfile]'
})
export class SearchProfileDirective {

  constructor( private addColor:ElementRef ) {
    this.addColor.nativeElement.style.color = "red"
   }

}

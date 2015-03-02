import {Decorator, NgElement} from '../../../angular2/angular2';

@Decorator({selector: '[red]'})
export class RedDec {
  constructor(el: NgElement) {
    el.domElement.style.color = 'red';
  }
}


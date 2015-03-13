import {Component, Template} from '../../angular2/angular2';
import {GreetingService} from '../services/greeting_service';
import {RedDec} from '../directives/red_dec';

@Component({
  selector: 'greeting-app',
  services: [GreetingService]
})
@Template({
  url: `greeting_app/components/greeting_app.html`,
  directives: [RedDec, FooBar]
})
export class GreetingApp {
  greeting: string;
  name: string;
  btnLabel: string;

  constructor(service : GreetingService) {
    this.greeting = service.greeting;
    this.name = service.name;
    this.btnLabel = service.btnLabel;
  }

  toggleGreeting() {
    this.greeting = this.greeting == 'Howdy' ? 'Hello' : 'Howdy';
  }

  changeName(newName: string) {
    this.name = newName == '' ? 'World' : newName;
  }
}

@Component({
  selector: 'foo-bar',
  bind: {
    'first-name': 'firstName'
  }
})
@Template({
  inline: `<div>{{firstName}}</div>`
})
export class FooBar {
  _firstName: string;

  get firstName(): string {return this._firstName}

  set firstName(name: string) {this._firstName = name;}
}

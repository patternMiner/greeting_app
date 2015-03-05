import {Component, Template} from '../../angular2/angular2';
import {GreetingService} from '../services/greeting_service';
import {RedDec} from '../directives/red_dec';

@Component({
  selector: 'greeting-app',
  bind: {'blah' : 'blah'},
  componentServices: [GreetingService]
})
@Template({
  url: `greeting_app/components/greeting_app.html`,
  directives: [RedDec]
})
export class GreetingApp {
  greeting: string;
  name: string;
  btnLabel: string;

  constructor(service: GreetingService) {
    this.greeting = service.greeting;
    this.name = 'World';
    this.btnLabel = 'Toggle greeting';
  }

  toggleGreeting() {
    this.greeting = this.greeting == 'Howdy' ? 'Hello' : 'Howdy';
  }

  changeName(newName: string) {
    this.name = newName == '' ? 'World' : newName;
  }

  set blah(value) {
    console.log('set blah called with value=' + value);
  }

  get blah() {
    return 'Blah!';
  }
}

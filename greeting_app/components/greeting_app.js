import {Component, Template} from '../../angular2/angular2';
import {GreetingService} from '../services/greeting_service';
import {RedDec} from '../directives/red_dec';

@Component({
  selector: 'greeting-app',
  componentServices: [GreetingService]
})
@Template({
  url: `greeting_app/components/greeting_app.html`,
  directives: [RedDec]
})
export class GreetingApp {
  greeting: string;

  constructor(service: GreetingService) {
    this.greeting = service.greeting;
  }

  toggleGreeting() {
    this.greeting = this.greeting == 'Howdy' ? 'Hello' : 'Howdy';
  }
}

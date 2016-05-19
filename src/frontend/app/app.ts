import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.template.html'
})
export class AppComponent{
  private hello_world: string = "Hi from Angular 2!";
}

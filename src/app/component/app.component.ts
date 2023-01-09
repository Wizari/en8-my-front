import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'en8-my-front';
  userAuthorized: boolean = false
  // userAuthorized: boolean = true
}

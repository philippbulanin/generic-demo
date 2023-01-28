import { Component } from '@angular/core';
import {MainHttpService} from "./services/main-http.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private http: MainHttpService
  ) {
  }

  login(): void {
    this.http.login('admin', '123123').subscribe();
  }
}

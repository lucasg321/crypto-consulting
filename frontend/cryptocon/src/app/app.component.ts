import { Component } from '@angular/core';
import { UserService } from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  logged_in = localStorage.getItem("access_token");

  constructor(public _userService: UserService) { }

  logout() {
    this._userService.logout();
  }
}

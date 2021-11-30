import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  logged_in = localStorage.getItem("access_token");
  email = localStorage.getItem("email");

  public user: any;

  constructor(public _userService: UserService) {
  }

  ngOnInit() {
    this._userService.getUserInfo(this.email);
  }

}

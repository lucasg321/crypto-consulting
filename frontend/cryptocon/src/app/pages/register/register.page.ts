import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email: string;
  first_name: string;
  last_name: string;
  password: string;
  password2: string;

  constructor(public _userService: UserService) { }

  ngOnInit() {
  }

  signup(){
    this._userService.signup({'first_name': this.first_name, 'last_name': this.last_name,
      'email': this.email, 'password': this.password, 'password2': this.password2});
  }

}

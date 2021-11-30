import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  logged_in = localStorage.getItem("access_token");
  username = localStorage.getItem("email");

  password: string;

  public env: any;

  public access: any;

  public email: any;

  public refresh: any;

  public error: any;

  constructor(public _userService: UserService, private _Activatedroute:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.access = this._Activatedroute.snapshot.paramMap.get("access");
    this.email = this._Activatedroute.snapshot.paramMap.get("email");
    this.refresh = this._Activatedroute.snapshot.paramMap.get("refresh");
    if (this.access && this.email && this.refresh){
      this.sso();
    }
    this.env = environment;
  }

  onSubmit() {
    alert(this.email + ', ' + this.password)
 }

  login() {
    this._userService.login({'email': this.email, 'password': this.password});
  }

  refreshToken() {
    this._userService.refreshToken();
  }

  logout() {
    this._userService.logout();
  }

  sso() {
    this._userService.sso(this.access, this.email, this.refresh);
  }

}

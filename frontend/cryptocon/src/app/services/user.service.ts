import {Injectable, Input} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppRoutingModule} from "../app-routing.module";
import {environment} from "../../environments/environment";



@Injectable({
  providedIn: 'root',
})
@Injectable()
export class UserService {

  @Input()
  // http options used for making API calls
  private httpOptions: any;

  private httpOptions2: any;

  // the JWT access token
  public token: string;

  // the JWT refresh token
  public refresh_token: string;

  // the token expiration date
  public token_expires: Date;

  // the username of the logged in user
  public email: string;

  public env: any;

  public getToken(): any {
    return localStorage.getItem('access_token') || false;
  }
  public getUser(): any {
    return localStorage.getItem('email') || false;
  }
  public getTokenExpiration(): any {
    return localStorage.getItem('expires_at') || false;
  }

  // error messages received from the login attempt
  public errors: any;

  public userInfo: any;

  constructor(private http: HttpClient, private router: AppRoutingModule) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    this.env = environment;
  }

  // Uses http.post() to get an auth token from djangorestframework-jwt endpoint
  public login(user) {
    this.http.post(this.env.beUrl+'/api/token/', JSON.stringify(user), this.httpOptions).subscribe(
      data => {
        this.updateData(data['access'], data['refresh']);
        // window.location.reload();
        // store the JWT access, refresh, and expire time into local storage
        localStorage.setItem('access_token', this.token);
        localStorage.setItem('refresh_token', this.refresh_token);
        localStorage.setItem("expires_at", JSON.stringify(this.token_expires));
        localStorage.setItem('email', user.email);
        localStorage.setItem('password', user.password);
        window.location.href=this.env.feUrl+"/home";
      },
      err => {
        this.errors = err['error'];
      }
    );
  }

  // Refreshes the JWT token, to extend the time the user is logged in, can only refresh once
  public refreshToken() {
    this.http.post(this.env.beUrl+'/api/token/refresh/', JSON.stringify({refresh: this.refresh_token}), this.httpOptions).subscribe(
      data => {
        this.updateData(data['access'], data['refresh']);
        localStorage.setItem('access_token', this.token);
        localStorage.setItem('refresh_token', this.refresh_token);
        localStorage.setItem("expires_at", JSON.stringify(this.token_expires));
        },
      err => {
        this.errors = err['error'];
      }
    );
  }

  public sso(access, email, refresh) {
    this.updateData(access, refresh);
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    localStorage.setItem('email', email);
    window.location.href=this.env.feUrl+"/home";
  }

  public logout() {
    this.token = null;
    this.refresh_token = null;
    this.token_expires = null;
    this.email = null;
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    window.location.href=this.env.feUrl+"/home";
  }

  private updateData(token, refresh_token) {
    this.token = token;
    this.refresh_token = refresh_token;
    this.errors = [];
    this.email = localStorage.getItem('email');

    // decode the token to read the username and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
  }

  public signup(user){
    this.http.post(this.env.beUrl+'/api/register/', JSON.stringify(user), this.httpOptions).subscribe(
      data => {
        // store the JWT access, refresh, and expire time into local storage
        console.log("User creation success");
        this.login(user);
        localStorage.setItem('email', user.email);
        this.router.redirect('home');
      },
      err => {
        this.errors = err['error'];
      }
    );
  }

  public getUserInfo(email){
    this.httpOptions2 = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('access_token')})
    };
    console.log(email);
    console.log(localStorage.getItem('access_token'));
    this.http.put(this.env.beUrl+'/api/user/', JSON.stringify({email: email}), this.httpOptions2).subscribe(
      data => {
        console.log('User retrieval success');
        this.userInfo = data;
        console.log(data);
      },
      err => {
        this.errors = err['error'];
        console.log(err['error'])
      }
    );
  }

}

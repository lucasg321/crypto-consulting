import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { environment } from '../../environments/environment';

export interface Consultant {
  email: string;
  first_name: string;
  last_name: string;
  date_joined: string;
  expertise?: string;
  description?: string;
  calendly_id?: string;
  tags?: string;
  profile_pic?: any;
  is_active: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConsultantService {
  private httpOptions: any;

  public env: any;
  url: string;
  constructor(private  http:  HttpClient, private _userService: UserService) {
    this.env = environment;
    this.url = this.env.beUrl;
    this.url = 'http://localhost:8000';
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }

  // Uses http.get() to load data from a single API endpoint
  list(): Observable<Consultant[]> {
     // Enter JWT as header, if auth is needed for the endpoint
  //   let access_token = localStorage.getItem("access_token");
  //   let httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Bearer ' + access_token
  //     })
  //   };
    // console.log(this.httpClient.get<Product[]>('http://127.0.0.1:8000/api/products/'), httpOptions);
    // return this.httpClient.get<Product[]>('http://127.0.0.1:8000/api/products/', httpOptions);

    return this.http.get<Consultant[]>(this.url+'/api/consultant/');
  }

  get(id: any): Observable<Consultant> {
    console.log("tests" + id);
    return this.http.get<Consultant>(this.url+'/api/consultant/${id}');
  }

}

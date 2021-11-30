import { Injectable } from '@angular/core';
import {Consultant} from "./consultant.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserService} from "./user.service";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Question} from "./questions.service";

export interface Category {
  name: string;
  consultants: Consultant[];
  image_url?: any;
}

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {
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
  list(): Observable<Category[]> {
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

    return this.http.get<Category[]>(this.url+'/api/category/');
  }
}

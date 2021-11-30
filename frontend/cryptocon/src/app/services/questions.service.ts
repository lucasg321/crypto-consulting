import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserService} from "./user.service";
import { Consultant } from "./consultant.service";
import { Category } from "./categories.service";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

export interface Question {
  expertise: string;
  question: string;
  subtitle: string;
  consultants: Consultant[];
  categories: Category[];
  pk: number;
}


@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
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
  list(): Observable<Question[]> {
    return this.http.get<Question[]>(this.url+'/api/question/');
  }
  get(pk: number): Observable<Question> {
    return this.http.get<Question>(this.url+`/api/question/${pk}`);
  }
}

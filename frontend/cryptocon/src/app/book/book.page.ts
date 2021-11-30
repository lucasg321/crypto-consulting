import { Component, OnInit } from '@angular/core';
import {Question, QuestionsService} from "../services/questions.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-book',
  templateUrl: './book.page.html',
  styleUrls: ['./book.page.scss'],
})
export class BookPage implements OnInit {
  dataReturned: any;
  questions?: Question[];
  Q: Question;
  public env: any;
  constructor(private questionService: QuestionsService) {
    this.env = environment;
  }

  ngOnInit() {
    this.getQuestions();
  }
  getQuestions() {
    console.log(this.questionService.list());
    this.questionService.list().subscribe(
      // the first argument is a function which runs on success
      data => {
        this.questions = data;
      },
      // the second argument is a function which runs on error
      error => console.error(error),
      // the third argument is a function which runs on completion
      () => console.log('done loading consultants')
    );
  }
  selectQ(question){
    this.Q = question;
  }
}

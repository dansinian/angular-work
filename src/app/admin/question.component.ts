import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Question } from '../entity/question';

declare var $: any;
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html'
})
export class QuestionComponent implements OnInit {
  basePath;
  question: Question;
  searchValue;
  sendData;
  isVisibleUpdate = false; //ÐÞ¸ÄModel

  constructor(private appService: AppService, private httpClient: HttpClient) {
    this.basePath = this.appService.getBasePath();
    this.question = {id:'', title:'', detail:'', userID:'', time:'', click:'', praise:'', reply:'', course:'', unread:'', src:'' };
  }

  ngOnInit() {
    //active
    $(".navigation li").removeClass();
    $(".navigation li").eq(3).addClass("active");
    this.sendData = {};
    this.httpClient.post(this.basePath + '', '').subscribe();
  }

}

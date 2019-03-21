import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-content',
  templateUrl: './question-content.component.html'
})
export class QuestionContentComponent implements OnInit {
  basePath;
  sendData;
  questionId;

  constructor(private appService: AppService, private httpClient: HttpClient, private activatedRoute: ActivatedRoute) {
    this.basePath = this.appService.getBasePath();
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.questionId = params['questionId'];
    });
    console.log(this.questionId);
    this.sendData = {"questionId": this.questionId};
    const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath + '/question/questionDetail', Params).subscribe(data => {
      if (data['status'] == '200') {
        console.log(data);
        //
      }
    }, error => {
      console.log(error);
    });
  }

}

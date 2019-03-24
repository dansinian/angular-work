import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-person-page',
  templateUrl: './person-page.component.html'
})
export class PersonPageComponent implements OnInit {
  basePath;
  sendData;
  userID;
  userNickName;
  userHeadImg;
  userAutograph;
  userQuestionList = [];
  userQuestionFlag = true;


  constructor(private appService: AppService, private httpClient: HttpClient, private route: Router, private activatedRoute: ActivatedRoute) {
    this.basePath = this.appService.getBasePath();
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      // this.questionId = params['questionId'];
      this.userID = params['userID'];
    });
    console.log(window.location.href); 
    this.sendData = {"content": this.userID};
    const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath + '/user/selectUser', Params).subscribe(data => {
      if (data != null && data != '') {
        if (data['status'] == 200) {
          let user = data['user'];
          this.userAutograph = user['autograph'];
          this.userNickName = user['nickname'];
          this.userHeadImg = user['headImg'];
          if (data['questions'].length == 0) {
            this.userQuestionFlag = false;
          } else {
            this.userQuestionList = data['questions'];
          }
          console.log(this.userQuestionFlag, this.userQuestionList);
        }
      }
    }, error => {
      console.log("errror");
    });


  }

  //Ìû×ÓÏêÇé
  positionQuestion(item) {
    console.log(item);
    if (item.questionId != null && item.questionId != '') {
      this.route.navigate(['/questionContent'], {queryParams: {'questionId': item.questionId, "userID": item.userId}});
      location.reload(true);
    }
  }

}

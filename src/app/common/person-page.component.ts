import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';

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
  userFocus; // focus: 关注； unfocus： 未关注
  loginUserID;

  constructor(private appService: AppService, private httpClient: HttpClient, private route: Router, private activatedRoute: ActivatedRoute,
              private message: NzMessageService) {
    this.basePath = this.appService.getBasePath();
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      // this.questionId = params['questionId'];
      this.userID = params['userID'];
      this.userFocus = params['focus'];
      console.log(this.userID);
      if (localStorage.getItem('personPageUserID') !== this.userID) {
        location.reload(true);
      }
      localStorage.setItem('personPageUserID', params['userID']);
    });
    this.sendData = {'content': this.userID};
    const Params = new HttpParams().set('data', JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath + '/user/selectUser', Params).subscribe(data => {
      if (data != null && data !== '') {
        console.log(data);
        if (data['status'] === '200') {
          const user = data['user'];
          this.userAutograph = user['autograph'];
          this.userNickName = user['nickname'];
          this.userHeadImg = user['headImg'];
          if (data['questions'].length === 0) {
            this.userQuestionFlag = false;
          } else {
            this.userQuestionList = data['questions'];
          }
        }
      }
    }, error => {
      console.log('errror');
    });

    this.loginUserID = localStorage.getItem('userID');

  }
  // 关注
  getFocus() {
    console.log(this.loginUserID, this.userID);
    if (this.loginUserID === this.userID) {
      this.message.error('不能关注自己！');
    } else {
      this.sendData = {
        'userId': this.loginUserID,
        'followedId': this.userID
      };
      const Params = new HttpParams().set('data', JSON.stringify(this.sendData));
      this.httpClient.post(this.basePath + '/user/follow', Params).subscribe(data => {
        if (data != null && data !== '') {
          if (data['status'] === '200') {
            this.message.success(data['msg']);
            location.reload(true);
          } else {
            this.message.error(data['msg']);
          }
        }
      }, error => {
        this.message.error('关注失败！');
      });
    }
  }

  // 帖子详情
  positionQuestion(item) {
    if (item.questionId !== null && item.questionId !== '') {
      this.route.navigate(['/questionContent'], {queryParams: {'questionId': item.questionId, 'userID': item.userId}});
      location.reload(true);
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';


@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html'
})
export class AvatarComponent implements OnInit {
  basePath;
  sendData;
  isVisibleFan = false;
  isVisibleAttend = false;
  isVisiblePost = false;
  userID;
  userNickName;
  userHeadImg;
  followLength; //关注
  followList = [];
  followedLength; //粉丝
  followedList = [];
  questionLength; //帖子
  questionList = [];


  constructor(private appService: AppService, private httpClient: HttpClient, private msg: NzMessageService, private route: Router) {
    this.basePath = this.appService.getBasePath();
  }

  ngOnInit() {
    this.userID = localStorage.getItem("userID");
    this.sendData = {"content": this.userID};
    const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath + '/user/selectUser', Params).subscribe(data => {
      if (data != null && data != '') {
        if (data['status'] == 200) {
          this.userNickName = data['user']['nickname'];
          this.userHeadImg =  data['user']['headImg'];
          this.followList = data['follow'];
          this.followedList = data['followed'];
          this.questionList = data['questions'];
          //长度
          this.followLength = this.followList.length;
          this.followedLength = this.followedList.length;
          this.questionLength = this.questionList.length;
        }
      }
    }, error => {
      console.log("errror");
    });

    
  }

  //进入详情
  positionQuestion(item) {
    if (item.questionId != null && item.questionId != '') {
      this.route.navigate(['/questionContent'], {queryParams: {'questionId': item.questionId, "userID": item.userId}});
      location.reload(true);
    }
  }

  //进入个人主页
  getPersonPage(item) {
    if (item.userId != null && item.userId != '') {
      this.route.navigate(['/person'], {queryParams: {"userID": item.userId}});
      location.reload(true);
    }
  }

  //删除帖子
  deleteQuestion(item) {
    this.sendData = {"questionId": item.questionId};
    const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath + '/question/deleteQuestion', Params).subscribe(data => {
      if (data['status'] == '200') {
        this.msg.success(data['msg']);
        location.reload(true);
      } else {
        this.msg.success(data['msg']);
      }
    }, error => {
      console.log(error);
    });
  }

  //关注信息
  getFouce(item, fouce) {
    console.log(item, fouce);
  }

  //打开
  openPost() { this.isVisiblePost = true; }
  openAttend() { this.isVisibleAttend = true; }
  openFan() { this.isVisibleFan = true; }
  //取消
  cancelPost() { this.isVisiblePost = false; }
  cancelAttend() { this.isVisibleAttend = false; }
  cancelFan() { this.isVisibleFan = false; }

}

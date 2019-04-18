import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

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
  questionListRecord = [];


  constructor(private appService: AppService, private httpClient: HttpClient, private msg: NzMessageService, private route: Router,
    private sanitizer: DomSanitizer) {
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
          //this.userHeadImg =  data['user']['headImg'];
          let imgUrl = data['user']['headImg'];
          let sanitizerUrl = this.sanitizer.bypassSecurityTrustUrl(imgUrl);
          this.userHeadImg = sanitizerUrl;

          this.followList = data['follow'];
          this.followedList = data['followed'];

          for (let item of this.followList) {
            let imgUrl = item['headImg'];
            let sanitizerUrl = this.sanitizer.bypassSecurityTrustUrl(imgUrl);
            item['headImg'] = sanitizerUrl;
          }

          for (let item of this.followedList) {
            let imgUrl = item['headImg'];
            let sanitizerUrl = this.sanitizer.bypassSecurityTrustUrl(imgUrl);
            item['headImg'] = sanitizerUrl;
          }
          console.log(this.followList, this.followedList);
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

    // 最新推荐数据
    this.httpClient.get(this.basePath + '/question/recommendQuestion').subscribe(data => {
      if (data != null && data != '') {
        if (data['status'] == '200') {
          this.questionListRecord = data['questions'];
        }
      }
    }, eror => {
      console.log("error");
    });

    
  }

  //进入详情
  positionQuestion(item) {
    if (item.questionId != null && item.questionId != '') {
      this.route.navigate(['/questionContent'], {queryParams: {'questionId': item.questionId, "userID": item.userId}});
      //location.reload(true);
    }
  }

  positionQuestionDetail(questionID, userID) {
    this.route.navigate(['/questionContent'], {queryParams: {'questionId': questionID, "userID": userID}});
  }

  //进入个人主页
  getPersonPage(item, focus) {
    if (item.userId != null && item.userId != '') {
      this.route.navigate(['/person'], {queryParams: {"userID": item.userId, "focus": focus}});
      //location.reload(true);
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
    this.sendData = {
      "userId": this.userID,
      "followedId": item.userId
    }
    const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
    if (fouce === 'fouce') {
      /*关注 */
      this.httpClient.post(this.basePath + '/user/follow', Params).subscribe(data => {
        if (data['status'] == '200') {
          this.msg.success(data['msg']);
        } else {
          this.msg.error(data['msg']);
        }
      }, error => {
        console.log("error");
      });

    } else{
      /*取消关注 */
      this.httpClient.post(this.basePath + '/user/unfollow', Params).subscribe(data => {
        if (data['status'] == '200') {
          this.msg.success(data['msg']);
        } else {
          this.msg.error(data['msg']);
        }
      }, error => {
        console.log("error");
      });
    }
    location.reload(true);

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

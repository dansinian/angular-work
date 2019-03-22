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
  queUserID;  //发表帖子用户ID
  queUserNickName;  //发表帖子用户昵称
  queUserHeadImg;  //发表帖子用户头像
  questionInfo;
  loginUserID;   //登录用户ID
  queContent;

  constructor(private appService: AppService, private httpClient: HttpClient, private activatedRoute: ActivatedRoute) {
    this.basePath = this.appService.getBasePath();
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.questionId = params['questionId'];
      this.queUserID = params['userID'];
    });
    // 获取用户信息
    const userParams = new HttpParams().set("data", JSON.stringify({"content": this.queUserID}));
    this.httpClient.post(this.basePath + '/user/selectUser', userParams).subscribe(data => {
      if (data['status'] == '200') {
          this.queUserNickName = data['user']['nickname'];
          this.queUserHeadImg = data['user']['headImg'];
      }
    }, error => {
      console.log("error");
    });

 
    this.sendData = {"questionId": this.questionId};
    const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath + '/question/questionDetail', Params).subscribe(data => {
      if (data['status'] == '200') {
        console.log(data);
        this.questionInfo = data['question'];
        //
      }
    }, error => {
      console.log(error);
    });

  }

  // 点赞
  getPraiseCount() {
    this.sendData = {
      "ID": this.questionId,
      "userId": this.queUserID,
    }
  }

  //删除
  deleteComment() {
    /*
    思路： 
       1, 判断帖子是否为当前登录用户:
            若是当前用户的帖子，可以随便删除,
            若不是，则只能删除自己发表了评论的内容  （给出权限不足）
        
    */
  }

  //评论
  showCommentReply() {

  }

}

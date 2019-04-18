import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpParams, HttpClient } from '@angular/common/http';
import { AppService } from 'src/app/app.service';
import { Question } from 'src/app/entity/question';
import { DomSanitizer } from '@angular/platform-browser';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html'
})
export class QuestionPageComponent implements OnInit {
  commentPartFlag = false; //控制评论框是否出现
  commentConent; //评论回复对象
  questionID;
  sendData;
  basePath;
  questionInfo;
  commentInfo;
  commentList = [];
  question: Question;
  questionImg;
  commentUserName;
  queContent;
  commentPublishId;

  constructor(private route: Router, private activatedRoute: ActivatedRoute, private httpClient: HttpClient, 
        private appService: AppService, private sanitizer: DomSanitizer, private message: NzMessageService) {
      this.basePath = this.appService.getBasePath();
      this.question = {id: '', time: '', title: '', detail: '', userID: '', click: '', praise: '', reply: '', course: '', unread: '', src: ''};
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
        this.questionID = params['id'];
    });

    if (!localStorage.getItem("userFlag")) {
      this.route.navigate(['/admin/login']);
      return;
    }

    //获取当前帖子信息
    this.sendData = {"questionId": this.questionID};
    const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath + '/question/questionDetail', Params).subscribe(data => {
      if (data != null && data != '') {
        let question = data['question'];
        console.log(data);
        //console.log(this.questionInfo);
        this.question.id = question['queId'];
        this.question.time = question['createTime'];
        this.question.course = question['queCourse'];
        this.question.praise = question['praiseCount'];
        this.question.detail = question['queDetail'];
        let imgUrl = question['queImg'];
        //let imgUrl = JSON.parse(question['queImg']).changingThisBreaksApplicationSecurity;
        let sanitizerUrl = this.sanitizer.bypassSecurityTrustUrl(imgUrl);
        this.questionImg = sanitizerUrl;
        this.question.title = question['queTitle'];
        this.question.reply = question['replyCount'];
        this.question.unread = question['createTime'];
        this.question.userID = question['unread'];
        this.question.click = question['clickCount'];
        console.log(this.question);
        if (!data['comments']) {
          this.commentInfo = data['comments'];
        } else {
          this.commentList = data['comments'];
        }
      }
    }, error => {
      console.log(error);
    });

  }

  //显示评论框
  showCommentReply(contentId, commentUserName) {
     /*
      1. 发表这个评论内容的用户Id，（一般为当前登录的用户）
      2. 评论内容的id，帖子id/评论id/回复id
    */
    this.queContent = "";
    this.commentUserName = commentUserName;  //回复的那个人
    this.commentPublishId = contentId;   //回复的那个Id
    this.commentPartFlag = true;
  }

  //发表评论之后隐藏评论框
  commentPublish() {
    let URL = "";
    let replyUserId;
    for (let comment of this.commentList) {
      console.log(comment);
      if (this.commentPublishId == comment.comment.commentId) {
        replyUserId = comment.comment.userId;
      }
      for (let reply of comment.reply) {
          if (this.commentPublishId == reply.replyId) {
            replyUserId = reply.replyedUser.Id;
          }
      }
    }
    this.sendData = {
      "commentId": this.commentPublishId,
      "userId": "admin",
      "content": this.queContent,
      "replyUserId": replyUserId
    }
    URL = '/commentReply/createCommentReply';

    console.log(this.sendData);
    const Params = new HttpParams().set("data", JSON.stringify(this.sendData));

    this.httpClient.post(this.basePath + URL, Params).subscribe(data => {
      if (data != null && data != '') {
        if (data['status'] == '200') {
          this.message.success(data['msg']);
          this.queContent = "";
          this.commentUserName = "";
          this.commentPartFlag = false;
        } else {
          this.message.error(data['msg']);
        }
      }
    }, error => {
      console.log("error");
    });
 
  }

  //删除
  deleteComment(id, action) {
    /*
    思路： 
      1, 判断帖子是否为当前登录用户:
            若是当前用户的帖子，可以随便删除,
            若不是，则只能删除自己发表了评论的内容  （给出权限不足）
        
    */
      let URL = '';
      if (action == 'comment') {
        this.sendData = { "commentId": id }
        URL = '/comment/deleteComment';
      } else {
        this.sendData = { "replyId": id }
        URL = '/commentReply/deleteCommentReply';
      }
      const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
      this.httpClient.post(this.basePath + URL, Params).subscribe(data => {
        if (data['status'] == '200') {
          this.message.success(data['msg']);
          location.reload(true);
        } else {
          this.message.error(data['msg']);
        }
      }, error => {
        console.log("error");
      });

    
  }


  //点赞
  getPraiseCount(id, action) {
    this.sendData = {
      "ID": id,
      "userId": 'admin',
      "type":action
    }
    const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath + '/user/likes', Params).subscribe(data => {
      if (data['status'] == '200') {
        this.message.success(data['msg']);
      } else {
        this.message.error(data['msg']);
      }
    }, error => {
      console.log("error");
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/entity/question';
import { NzMessageService } from 'ng-zorro-antd';
import { error } from 'util';

@Component({
  selector: 'app-question-content',
  templateUrl: './question-content.component.html'
})
export class QuestionContentComponent implements OnInit {
  question: Question;
  basePath;
  sendData;
  questionId;
  queUserID;  //发表帖子用户ID
  queUserNickName;  //发表帖子用户昵称
  queUserHeadImg;  //发表帖子用户头像
  questionInfo;
  loginUserID;  //登录用户ID
  queContent;
  commentList = [];  //评论list
  commentInfo;
  commentUserName = "" ; //评论人昵称
  commentPublishId; //评论内容ID
  praiseLikeData;  //点赞记录

  questionContentId; //判断当前页面是否更新
  userFocus = 'unfocus';

  constructor(private appService: AppService, private httpClient: HttpClient, private activatedRoute: ActivatedRoute, private message: NzMessageService) {
    this.basePath = this.appService.getBasePath();
    this.question = {id: '', time: '', title: '', detail: '', userID: '', click: '', praise: '', reply: '', course: '', unread: '', src: ''};
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.questionId = params['questionId'];
      this.queUserID = params['userID'];
      this.questionContentId = JSON.stringify(params);
      if (this.questionContentId !== localStorage.getItem("questionContentId")) {
        location.reload(true);
      }
      localStorage.setItem("questionContentId", this.questionContentId);
    });

    /*当前登录用户ID*/
    this.loginUserID = localStorage.getItem("userID");

    //获取登录用户的点赞信息
    const userLoginParams = new HttpParams().set("data", JSON.stringify({"content": this.loginUserID}));
    this.httpClient.post(this.basePath + '/user/selectUser', userLoginParams).subscribe(data => {
      if (data['status'] == '200') {
          console.log(data);
          this.praiseLikeData = data['likes'];
      }
    }, error => {
      console.log("error");
    });

    // 获取用户信息
    const userParams = new HttpParams().set("data", JSON.stringify({"content": this.queUserID}));
    this.httpClient.post(this.basePath + '/user/selectUser', userParams).subscribe(data => {
      if (data['status'] == '200') {
          //console.log(data);
          this.queUserNickName = data['user']['nickname'];
          this.queUserHeadImg = data['user']['headImg'];
          if (data['follow'].length == 0) {
            this.userFocus = 'focus';
          } else {
            for (let item of data['follow']) {
              if (item.userId == this.loginUserID) {
                this.userFocus = 'focus';
              }
            }
          }
          
      }
    }, error => {
      console.log("error");
    });
 
    //获取当前帖子信息
    this.sendData = {"questionId": this.questionId};
    const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath + '/question/questionDetail', Params).subscribe(data => {
      if (data != null && data != '') {
        let question = data['question'];
        console.log(data);
        this.question.id = question['queId'];
        this.question.time = question['createTime'];
        this.question.course = question['queCourse'];
        this.question.praise = question['praiseCount'];
        this.question.detail = question['queDetail'];
        this.question.src = question['queImg'];
        this.question.title = question['queTitle'];
        this.question.reply = question['replyCount'];
        this.question.unread = question['createTime'];
        this.question.userID = question['unread'];
        this.question.click = question['clickCount'];
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

  //关注
  getFocus() {
    this.sendData = {
      "userId": this.loginUserID,
      "followedId": this.queUserID
    }
    const Params = new HttpParams().set("data", JSON.stringify(this.sendData));

    this.httpClient.post(this.basePath + '/user/follow',Params).subscribe(data => {
      if (data != null && data != '') {
        if (data['status'] == '200') {
          this.message.success(data['msg']);
          location.reload(true);
        } else {
          this.message.error(data['msg']);
        }
      }
    }, error => {
      console.log("error");
    });
  }

 // 点赞
 getPraiseCount(id, action) {
   let flag = false;
   if (action == 'question') {
      for (let like of this.praiseLikeData.question) {
        if (id == like) {
          flag = true;
        }
      }
   } else if (action == 'comment') {
      for (let like of this.praiseLikeData.comment) {
        if (id == like) {
          flag = true;
        }
      }
   } else if (action == 'commentReply') {
      for (let like of this.praiseLikeData.reply) {
        if (id == like) {
          flag = true;
        }
      }
   }
   console.log(flag);
   if (!flag) {
      this.sendData = {
        "ID": id,
        "userId": this.loginUserID,
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
   } else {
     this.message.success("小主，您不可以重复点赞！");
   }
  
}

  //删除
  deleteComment(id, action, userId) {
    /*
    思路： 
      1, 判断帖子是否为当前登录用户:
            若是当前用户的帖子，可以随便删除,
            若不是，则只能删除自己发表了评论的内容  （给出权限不足）
        
    */
    if (userId == this.loginUserID || this.loginUserID == this.question.userID) {
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
    } else {
      this.message.success("该用户没有删除权限！");
    }
    

  }

  //评论
  showCommentReply(contentId, commentUserName) {
    /*
      1. 发表这个评论内容的用户Id，（一般为当前登录的用户）
      2. 评论内容的id，帖子id/评论id/回复id
    */
    this.queContent = "";
    this.commentUserName = commentUserName;  //回复的那个人
    this.commentPublishId = contentId;   //回复的那个Id

  }

  //发表评论内容
  commentPublish() {
    if (this.queContent != null && this.queContent != '') {
      let URL = "";
      /* 评论当前帖子 */
      if (this.commentPublishId == this.questionId) {
        this.sendData = {
          "questionId": this.commentPublishId,
          "userId": this.loginUserID,
          "content": this.queContent
        }
        URL = '/comment/createComment';
      /* 评论内容或者回复内容 */
      } else {
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
          "userId": this.loginUserID,
          "content": this.queContent,
          "replyUserId": replyUserId
        }
        URL = '/commentReply/createCommentReply';
      }
      console.log(this.sendData);
      const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
  
      this.httpClient.post(this.basePath + URL, Params).subscribe(data => {
        if (data != null && data != '') {
          if (data['status'] == '200') {
            this.message.success(data['msg']);
            this.queContent = "";
            this.commentUserName = "";
          } else {
            this.message.error(data['msg']);
          }
        }
      }, error => {
        console.log("error");
      });
    }

  }

}

import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

declare var $: any;
@Component({
  selector: 'app-view-attention',
  templateUrl: './view-attention.component.html'
})
export class ViewAttentionComponent implements OnInit {
  basePath;
  sendData;
  loginFlag;
  department;
  major;
  loginUserID; //当前登录用户ID
  followQuestionList = [];
  commentUserName;
  queContent;
  commentPublishId;
  commentShowFlag = 'show';
  praiseLikeData = [];

  constructor(private appService: AppService, private httpClient: HttpClient, private route: Router, private activatedRoute: ActivatedRoute,
    private message: NzMessageService) {
    this.basePath = this.appService.getBasePath();
  }

  ngOnInit() {
    this.loginFlag = localStorage.getItem("loginFlag");
    this.loginUserID = localStorage.getItem("userID");
    $(".header-left li").removeClass();//active
    $(".header-left li").eq(1).addClass('active');

    //获取登录用户的点赞信息
    const userLoginParams = new HttpParams().set("data", JSON.stringify({"content": this.loginUserID}));
    this.httpClient.post(this.basePath + '/user/selectUser', userLoginParams).subscribe(data => {
      if (data['status'] == '200') {
        console.log(data);
        this.praiseLikeData = data['likes']['question'];
        //questions
          for (let follow of data['follow']) {
            console.log("userID: ", follow);
            const followParams = new HttpParams().set("data", JSON.stringify({"content": follow.userId}));
            this.httpClient.post(this.basePath + '/user/selectUser', followParams).subscribe(params => {
              if (params['status'] == '200') {
                  console.log("foll0w: ", params);
                  // 关注的所有人信息
                  if (params['questions']) {
                    for (let question of params['questions']) {
                        this.followQuestionList.push({
                          "question": question,
                          "user": params['user'] ? params['user'] : ''
                        });
                    }
                  }
                  // this.followQuestionList.push({
                  //   "question": params['questions'] ? params['questions'] : '',
                  //   "user": params['user'] ? params['user'] : ''
                  // });
                  console.log(this.followQuestionList);
              }
            }, error => {
              console.log("error");
            });
            // console.log(this.followQuestionList);
          }
          
      }
    }, error => {
      console.log("error");
    });

  }

  //取消关注
  cancelFouce(userID) {
    console.log(userID);
    this.sendData = {
      "userId": this.loginUserID,
      "followedId": userID
    }
    const Params = new HttpParams().set("data", JSON.stringify(this.sendData));

    this.httpClient.post(this.basePath + '/user/unfollow',Params).subscribe(data => {
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

  //点赞
  getPraiseCount(ID) {
    let flag = false;
    for (let like of this.praiseLikeData) {
      if (ID == like) {
        flag = true;
      }
    }
    if (!flag) {
        this.sendData = {
          "ID": ID,
          "userId": this.loginUserID,
          "type": 'question'
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

  //评论信息
  showCommentReply(questionID, userName) {
      this.commentUserName = userName;
      this.commentPublishId = questionID;
      this.commentShowFlag = 'show' + questionID;
  }

  //发表评论
  commentPublish() {
    this.sendData = {
      "questionId": this.commentPublishId,
      "userId": this.loginUserID,
      "content": this.queContent
    }
    const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
    
    this.httpClient.post(this.basePath + '/comment/createComment', Params).subscribe(data => {
      if (data != null && data != '') {
        if (data['status'] == '200') {
          this.message.success(data['msg']);
          this.queContent = "";
          this.commentUserName = "";
          this.commentShowFlag = '';
        } else {
          this.message.error(data['msg']);
        }
      }
    }, error => {
      console.log("error");
    });

  }


  getNavValue(event) {
    console.log(event);
    let arr = event.split(',');
    this.department = arr[0],
    this.major = arr[1];
    this.route.navigate(['/home'], {queryParams: {"department" : this.department, "major": this.major}});
  }

}

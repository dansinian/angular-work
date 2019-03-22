import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  basePath;
  sendData;
  loginFlag;
  adminQuestionList = [];
  userQuestionList = [];

  constructor(private appService: AppService, private httpClient: HttpClient, private route: Router) {
    this.basePath = this.appService.getBasePath();
  }

  ngOnInit() {
    this.loginFlag = localStorage.getItem("loginFlag");
    $(".header-left li").removeClass();//active
    $(".header-left li").eq(0).addClass('active');
    // 获取admin帖子信息
    const adminParams = new HttpParams().set("data", JSON.stringify(""));
    this.httpClient.post(this.basePath + '/question/adminList', adminParams).subscribe(data => {
      if (data['status'] == '200') {
        this.adminQuestionList = data['questions'];
      }
    }, error => {
      console.log(error);
    });

    //正常帖子信息
    const recommendParams = new HttpParams().set("data", "");
    this.httpClient.post(this.basePath + '/question/recommendQuestion', recommendParams).subscribe(data => {
      if (data['status'] == '200') {
        this.userQuestionList = data['questions'];
      }
    }, error => {
      console.log("error");
    });

  }

  //搜索
  getSearchValue(event) {
    this.sendData = {
      "content": event,
    };
  }

  //帖子详情
  positionQuestion(item) {
    if (this.loginFlag != 'true') {
      this.appService.info("请先登录！");
    } else {
      if (item.queId != null && item.queId != '') {
        this.route.navigate(['/questionContent'], {queryParams: {"questionId" : item.queId, "userID": item.userId}});
      }
    }
    
  }

}

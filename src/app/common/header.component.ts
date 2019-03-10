import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  basePath;
  flagLogin = false;  //登录框是否显示
  isVisibleUpdate = false; //修改密码
  isVisibleLogin = false; //登录
  oldPassword;
  newPassword;
  repeatPassword;
  sendData;
  account;
  password;
  loginFlag; //判断用户是否登录

  constructor(private httpClient: HttpClient, private appService: AppService, private route: Router) {
    this.basePath = this.appService.getBasePath();
  }

  ngOnInit() {
    this.loginFlag = localStorage.getItem("loginFlag");
    $(".header-left li").on('click', function() {
      if (this.loginFlag != 'true') {
        this.route.navigate(['/home']);
        this.appService.info("请先登录！");
      }
    });
  }

  //修改密码
  updatePass() {
    this.isVisibleUpdate = true;
  }
  updateCancel() {
    this.isVisibleUpdate = false;
  }
  updateOk() {
    this.sendData = {
      "old": this.oldPassword,
      "new": this.newPassword,
      "repeat": this.repeatPassword
    }
    this.isVisibleUpdate = false;
  }

  //用户登录
  loginPerson() {
    this.isVisibleLogin = true;
  }
  loginCancel() {
    this.isVisibleLogin = false;
  }
  loginOk() {
    if (this.account != '' && this.account != null && this.password != null && this.password != '') {
      this.sendData = {
        "userId": this.account,
        "password":  this.password
      }
      const Params = new HttpParams().set("data",JSON.stringify(this.sendData));
      this.httpClient.post(this.basePath + '/user/userLogin', '').subscribe(data => {
        if (data['status'] == '200') {
          this.flagLogin = true;
          this.isVisibleLogin = false;
          localStorage.setItem("loginFlag", "true");
        }
      }, error => {
        console.log("error");
      });
    } else {
      this.appService.info("账户密码为必填字段");
    }
  }

  //发送消息
  getMessage() {
    if (this.loginFlag != 'true') {
      this.appService.info("请先登录！");
    }
  }

  //退出系统
  dropSystem() {
    localStorage.setItem("loginFlag", "");
    this.flagLogin = false;
    location.reload(true);
  }

}

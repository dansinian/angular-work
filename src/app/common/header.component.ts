import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  @Output('search') getSearchValue = new EventEmitter<any>();
  searchValue: any;
  basePath;
  flagLogin = false;  //登录框是否显示
  isVisibleUpdate = false; //修改密码
  isVisibleLogin = false; //登录
  isVisiblePersonInfo = false; //个人信息
  isVisibleImg = false; //更换头像
  oldPassword;
  newPassword;
  repeatPassword;
  sendData;
  account;
  password;
  loginFlag; //判断用户是否登录
  nickName;
  userNickName;
  userSignature;
  userID;

  constructor(private httpClient: HttpClient, private appService: AppService, private route: Router) {
    this.basePath = this.appService.getBasePath();
  }

  ngOnInit() {
    this.loginFlag = localStorage.getItem("loginFlag");
    this.userID = localStorage.getItem("userID");
   
    if (this.loginFlag != 'true') {
      this.flagLogin = false;
    } else {
      this.flagLogin = true;
    }

    //获取当前登录用户信息
    console.log(this.userID, this.loginFlag);
    if (this.userID) {
      this.sendData = { "content": this.userID };
      const userIDParams = new HttpParams().set("data", JSON.stringify(this.sendData));
      console.log(this.sendData);
      this.httpClient.post(this.basePath + '/user/selectUser', userIDParams).subscribe(data => {
        if (data['status'] == '200') {
          console.log(data);
        }
      }, error => {
        console.log("error");
      });
    }


  }

  //搜索
  getSearchInfo() {
    this.getSearchValue.emit(this.searchValue);
  }

  //查看头像
  viewImg() { this.isVisibleImg = true; }
  ImgCancel() { this.isVisibleImg = false; }
  ImgOk() {

  }
  

  //个人信息
  updatePersonInfo() { this.isVisiblePersonInfo = true; }
  personInfoCancel() { this.isVisiblePersonInfo = false; }
  personInfoOk() {

  }

  //修改密码
  updatePass() { this.isVisibleUpdate = true; }
  updateCancel() { this.isVisibleUpdate = false; }
  updateOk() {
    this.sendData = {
      "old": this.oldPassword,
      "new": this.newPassword,
      "repeat": this.repeatPassword
    }
    this.isVisibleUpdate = false;
  }

  //用户登录
  loginPerson() { this.isVisibleLogin = true; }
  loginCancel() { this.isVisibleLogin = false; }
  loginOk() {
    if (this.account != '' && this.account != null && this.password != null && this.password != '') {
      this.sendData = {
        "userId": this.account,
        "password":  this.password
      }
      const Params = new HttpParams().set("data",JSON.stringify(this.sendData));
      this.httpClient.post(this.basePath + '/user/userLogin', Params).subscribe(data => {
        if (data['status'] == '200') {
          console.log(data);
          this.flagLogin = true;
          this.isVisibleLogin = false;
          localStorage.setItem("loginFlag", "true");
          localStorage.setItem("userID", data['admin']['userId']);
          location.reload(true);
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
      this.isVisibleLogin = true;
    }
  }

  //退出系统
  dropSystem() {
    localStorage.setItem("loginFlag", "");
    localStorage.setItem("userID", "");
    this.route.navigate(['/home']);
    location.reload(true);
    this.flagLogin = false;
  }

}

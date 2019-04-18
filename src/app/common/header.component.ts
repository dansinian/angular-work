import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { NzMessageService } from 'ng-zorro-antd';

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
  userNickName;
  userSignature;
  userHeadImg;
  userID;
  promptFlag = false; //密码
  questionImg;
  userHeadImgFlag = true;
  img;

  constructor(private httpClient: HttpClient, private appService: AppService, private route: Router, private sanitizer: DomSanitizer,
    private message: NzMessageService) {
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
      this.httpClient.post(this.basePath + '/user/selectUser', userIDParams).subscribe(data => {
        if (data['status'] == '200') {
          this.userNickName = data['user']['nickname'];
          this.userSignature = data['user']['autograph'];
          //this.userHeadImg = data['user']['headImg'];
          let imgUrl = data['user']['headImg'];
          let sanitizerUrl = this.sanitizer.bypassSecurityTrustUrl(imgUrl);
          this.userHeadImg = sanitizerUrl;
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

  //选择上传文件
  fileChange(event){
    let file = event.target.files[0];
    let imgUrl = window.URL.createObjectURL(file);
    let sanitizerUrl = this.sanitizer.bypassSecurityTrustUrl(imgUrl);
    this.img = sanitizerUrl
    this.questionImg = imgUrl;
  }

  //查看头像
  viewImg() { this.isVisibleImg = true; }
  ImgCancel() { this.isVisibleImg = false; }
  //更新头像
  ImgOk() {
    this.sendData = {
        "HeadImg": this.questionImg,
        "userId": this.userID,
    }

    const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath + '/user/updateUser', Params).subscribe(data => {
      if (data != null && data != '') {
          if (data['status'] == '200') {
            console.log(data);
            this.message.success(data['msg']);
            location.reload(true);
          } else {
            this.message.success(data['msg']);
          }
      }
    }, error => {
      console.log("error");
    });
    this.isVisibleImg = false; 
  }
  

  //个人信息
  updatePersonInfo() { this.isVisiblePersonInfo = true; }
  personInfoCancel() { this.isVisiblePersonInfo = false; }
  personInfoOk() {
    if (this.userNickName != '' && this.userNickName != null && this.userSignature != '' && this.userSignature != null) {
      this.sendData = {
        "userId": this.userID,
        "nickName": this.userNickName,
        "antugraph": this.userSignature
      }
      const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
      this.httpClient.post(this.basePath + '/user/updateUser', Params).subscribe(data => {
        if (data['status'] == '200') {
          this.appService.info(data['msg']);
          this.isVisiblePersonInfo = false;
          location.reload(true);
        } else {
          this.appService.info(data['msg']);
        }
      }, error => {
        console.log("error");
      });
    }

  }

  //修改密码
  updatePass() { this.isVisibleUpdate = true; }
  updateCancel() { this.isVisibleUpdate = false; }
  updateOk() {
    if (this.newPassword == this.repeatPassword) {
      this.sendData = {
        "oldpass": this.oldPassword,
        "newpass": this.newPassword,
        "userId": this.userID
      }
      const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
      this.httpClient.post(this.basePath + '/user/updatePass', Params).subscribe(data => {
        if (data['status'] == '200') {
          this.appService.info(data['msg']);
          this.isVisibleUpdate = false;
          this.oldPassword = "";
          this.newPassword = "";
          this.repeatPassword = "";
        } else {
          this.appService.info(data['msg']);
        }
      }, error => {
        console.log("error");
      });
    } else {
      this.promptFlag = true;
    }
    
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
    this.route.navigate(['/']);
    this.flagLogin = false;
  }

}

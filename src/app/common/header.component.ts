import { Component, OnInit } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  flagLogin = true;
  isVisibleUpdate = false; //修改密码
  isVisibleLogin = false; //登录
  oldPassword;
  newPassword;
  repeatPassword;
  sendData;

  constructor() { }

  ngOnInit() {
    $("#settingBtn").on('mouseover', function() {
      $(".seeting").mouseover(function(){

      });
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
    this.isVisibleLogin = false;
  }

}

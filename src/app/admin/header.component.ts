import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../entity/admin';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppService } from '../app.service';
import {NzMessageService, UploadFile} from 'ng-zorro-antd';
import {Observable, Observer} from 'rxjs';




declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  basePath;
  hideNavigation = true;
  isVisible = false;
  oldPassword;
  newPassword;
  repeatPassword;
  adminID;
  adminPassWord;
  sendData;
  promptFlag = false; // 密码两次输入不一样提示信息
  avatarUrl: string;
  loading = false;

  constructor(private route: Router, private httpClient: HttpClient, private appService: AppService,
              ) {
    this.basePath = this.appService.getBasePath();
  }

  ngOnInit() {
    this.adminID = localStorage.getItem('id');
    this.adminPassWord = localStorage.getItem('pass');
  }

  // 点击隐藏导航
  hideNav() {
    if (this.hideNavigation) {
      $('.admin-nav').hide();
      this.hideNavigation = false;
    } else {
      $('.admin-nav').show();
      this.hideNavigation = true;
    }
  }

  // 显示
  showModel() {
    this.isVisible = true;
  }
  // 退出系统
  drop() {
    localStorage.clear();
    this.route.navigate(['/admin']);
  }

  // 修改密码
  updatePass() {
    if (this.newPassword == this.repeatPassword) {
      this.sendData = {
        'adminId': this.adminID,
        'oldpass': this.oldPassword,
        'newpass': this.newPassword,
      };
      const Params = new HttpParams().set('data', JSON.stringify(this.sendData));
      this.httpClient.post(this.basePath + '/admin/updatePass', Params).subscribe(data => {
        if (data != null && data != '') {
          if (data['status'] == '200') {
            this.appService.info(data['msg']);
            this.isVisible = false;
          } else {
            this.appService.info(data['msg']);
          }
        }
      }, error => {
        this.appService.error('修改密码出错');
      });
    } else {
      this.promptFlag = true;
    }

  }

  handleCancel() { this.isVisible = false; }

}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../app.service';
import { Router } from '@angular/router';


declare var $: any;
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {
  basePath;
  user;
  isVisibleUpdate = false; //模态框
  isVisiblenotice = false; //模态框

  constructor(private httpClient: HttpClient, private appService: AppService, private route: Router) {
    this.basePath = this.appService.getBasePath();
  }

  ngOnInit() {
    this.user = localStorage.getItem("user");
    $(".attendance-nav ul li").removeClass('active');
    $(".attendance-nav ul li").eq(2).addClass('active');
  }

  //修改请假信息（查询）
  updateApply(ID) {
    this.isVisibleUpdate = true;

    // this.httpClient.post(this.basePath + '/leave/select', {"data": "data"}).subscribe(data => {

    //     if (data['msg'] == '') {
    //         //this.loginGuard.canActivate( true );
    //     }

    // },
    // error => {
    //     this.route.navigate(['/error'], {queryParams: {'msg': 'http请求失败', 'title': ''}});
    //   }
    // );  

  }
  //模态框取消（取消修改）
  handleCancel() {
    this.isVisibleUpdate = false;
  }
  //保存修改的信息
  saveUpdateApply() {
    this.isVisibleUpdate = false;
  }

  //通知老师请假信息
  noticeTeach(ID) {
    this.httpClient.post(this.basePath + '/leave/select', {"data": "data"}).subscribe(data => {

      if (data['msg'] == '') {
          //this.loginGuard.canActivate( true );
      }
      this.appService.succcess();

    },error => {
      this.appService.error("");
        //this.route.navigate(['/error'], {queryParams: {'msg': 'http请求失败', 'title': ''}});
    }
    );  
  }

}

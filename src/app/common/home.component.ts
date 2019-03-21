import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { HttpClient, HttpParams } from '@angular/common/http';

declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  basePath;
  sendData;
  loginFlag;

  constructor(private appService: AppService, private httpClient: HttpClient) {
    this.basePath = this.appService.getBasePath();
  }

  ngOnInit() {
    this.loginFlag = localStorage.getItem("loginFlag");
    $(".header-left li").removeClass();//active
    $(".header-left li").eq(0).addClass('active');
  }

  //获取搜索数据
  getSearchValue(event) {
    console.log(event);
  }

  //获取导航数据
  getNavValue(event) {
    console.log(event);
  }

}

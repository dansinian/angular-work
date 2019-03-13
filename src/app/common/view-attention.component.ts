import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { HttpClient, HttpParams } from '@angular/common/http';

declare var $: any;
@Component({
  selector: 'app-view-attention',
  templateUrl: './view-attention.component.html'
})
export class ViewAttentionComponent implements OnInit {
  basePath;
  sendData;
  loginFlag;

  constructor(private appService: AppService, private httpClient: HttpClient) {
    this.basePath = this.appService.getBasePath();
  }

  ngOnInit() {
    this.loginFlag = localStorage.getItem("loginFlag");
    $(".header-left li").removeClass();//active
    $(".header-left li").eq(1).addClass('active');
  }

}

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

  constructor(private appService: AppService, private httpClient: HttpClient, private route: Router) {
    this.basePath = this.appService.getBasePath();
  }

  ngOnInit() {
    this.loginFlag = localStorage.getItem("loginFlag");
    $(".header-left li").removeClass();//active
    $(".header-left li").eq(0).addClass('active');
    const adminParams = new HttpParams().set("data", JSON.stringify(""));
    this.httpClient.post(this.basePath + '/question/adminList', adminParams).subscribe(data => {
      if (data['status'] == '200') {
        this.adminQuestionList = data['questions'];
        console.log(data);
      }
    }, error => {
      console.log(error);
    });
  }

  //ËÑË÷
    getSearchValue(event) {
    console.log(event);
  }

  //Ìû×ÓÏêÇé
  positionQuestion(item) {
    console.log(item);
    if (item.queId != null && item.queId != '') {
      this.route.navigate(['/questionContent'], {queryParams: {"questionId" : item.queId}});
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { HttpClient, HttpParams } from '@angular/common/http';


declare var $: any;
@Component({
  selector: 'app-check',
  templateUrl: './check.component.html'
})
export class CheckComponent implements OnInit {
  basePath;
  sendData;
  checkFlag = 'false';

  constructor(private appService: AppService, private httpClient: HttpClient) {
    this.basePath = this.appService.getBasePath();
  }

  ngOnInit() {
    $(".attendance-nav ul li").removeClass('active');
    $(".attendance-nav ul li").eq(1).addClass('active');
    localStorage.setItem("checkFlag", this.checkFlag);
    if (this.checkFlag == 'false') {
      $("#open").removeAttr("disabled");
      $("#close").removeAttr("disabled");
      $("#close").attr("disabled", "true");
    } else {
      $("#open").removeAttr("disabled");
      $("#close").removeAttr("disabled");
      $("#open").attr("disabled", "true");
    }
  }

  //开启签到
  checkOpen() {
    this.checkFlag = 'true';
    $("#open").removeAttr("disabled");
    $("#close").removeAttr("disabled");
    $("#open").attr("disabled", "true");
    localStorage.setItem("checkFlag", this.checkFlag);
    this.sendData = { "teacherId": localStorage.getItem("id") };
    const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath + '/student/selectStudentByTeacher', Params).subscribe( data => {
      console.log(data);
      if (data != null && data != '') {
        if (data['status'] == '200') {
          console.log(data);
        }
      }
    }, error => {

    });
  }

  //关闭签到
  checkClose() {
    this.checkFlag = 'false';
    $("#open").removeAttr("disabled");
    $("#close").removeAttr("disabled");
    $("#close").attr("disabled", "true");
    localStorage.setItem("checkFlag", this.checkFlag);
    this.sendData = { "teacherId": localStorage.getItem("id") };
    const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath + '/student/selectReportStudent', Params).subscribe( data => {
      if (data != null && data != '') {
        if (data['status'] == '200') {
          console.log(data);
        }
      }
    }, error => {

    });
  }

}

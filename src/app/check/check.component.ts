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
  opencheckList = [];
  closecheckList = [];
  checkList = [];
  checkCourseID;
  week;
  startTime;
  endTime;
  listLength;

  constructor(private appService: AppService, private httpClient: HttpClient) {
    this.basePath = this.appService.getBasePath();
  }

  ngOnInit() {
    $(".attendance-nav ul li").removeClass('active');
    $(".attendance-nav ul li").eq(1).addClass('active');
    if (localStorage.getItem("checkFlag")) {
      this.checkFlag = localStorage.getItem("checkFlag");
    }
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
    this.sendData = {"teacherID": localStorage.getItem("id")};
    const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath +'/course/selectCourseByTeacher', Params).subscribe(data => {
      if (data != null && data != '') {
        if (data['status'] == '200') {
          let list = data['data']['Class'][0]['Student'];
          for (let item of list) {
            this.opencheckList.push({
              "name": item.name,
              "stuID": item.studentID
            });
          }
        }
      }
    }, error => {

    });
  }

  //开启签到
  checkOpen() {
    this.opencheckList = [];
    this.checkFlag = 'true';
    $("#open").removeAttr("disabled");
    $("#close").removeAttr("disabled");
    $("#open").attr("disabled", "true");
    localStorage.setItem("checkFlag", this.checkFlag);
    let weekArray = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
    let date = new Date();
    this.week = weekArray[date.getDay()];
    this.startTime = this.appService.getHours(date);
    this.sendData = { "teacherId": localStorage.getItem("id") };
    const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath + '/student/selectStudentByTeacher', Params).subscribe( data => {
      if (data != null && data != '') {
        if (data['status'] == '200') {
          this.checkCourseID = data['course']
          localStorage.setItem("checkCourseID", this.checkCourseID);
          for (let item of data['student']) {
            this.opencheckList.push({
              "name": item['name'],
              "stuID": item['stuID'],
              "flag": '0'
            });
          }
        }
      }
    }, error => {
      this.appService.error("检查代码！");
    });
  }

  //关闭签到
  checkClose() {
    this.checkFlag = 'false';
    $("#open").removeAttr("disabled");
    $("#close").removeAttr("disabled");
    $("#close").attr("disabled", "true");
    localStorage.setItem("checkFlag", this.checkFlag);
    let date = new Date();
    this.endTime = this.appService.getHours(date);
    this.sendData = { 
      "courseId": this.checkCourseID,
      "week": this.week,
      "startTime": this.startTime,
      "endTime": this.endTime
    };
    console.log(this.sendData);
    const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath + '/student/selectReportStudent', Params).subscribe( data => {
      if (data != null && data != '') {
        if (data['status'] == '200') {
          let list = data['students'];
          for (let item of list) {
            this.closecheckList.push({
              "name": item.stuName,
              "stuID": item.stuId
            });
          }
          console.log(this.opencheckList, this.closecheckList);
          //判断签到学生信息
          for (let i = 0; i < this.closecheckList.length; i++) {
            for (let j = 0; j < this.opencheckList.length; j++) {
              if (this.closecheckList[i].stuID == this.opencheckList[j].stuID) {
                this.opencheckList[j].flag = '1';
              }
            }
          }
          this.listLength = this.closecheckList.length;
          for (let item of this.opencheckList) {
            if (item.flag == '0') {
              this.checkList.push(item);
            }
          }
          console.log(this.opencheckList, this.checkList);
        }
      }
    }, error => {
      this.appService.error("检查代码！");
    });
  }

}

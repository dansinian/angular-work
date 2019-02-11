import { Component, OnInit } from '@angular/core';
import { EcharService } from '../common/echar.service';
import { ActivatedRoute } from '@angular/router';
import { HttpParams, HttpClient } from '@angular/common/http';
import { AppService } from 'src/app/app.service';


declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  basePath;
  list;
  teacherAttribute;
  type;
  sendData;
  selectCourse = [];
  selectStudent = [];
  selectClass = [];
  classHome;
  studentHome;
  courseHome;
  checkFlag;

  constructor(private echart: EcharService, private activatedRoute: ActivatedRoute, private httpClient: HttpClient, private appService: AppService) {
    this.basePath = this.appService.getBasePath();
  }

  ngOnInit() {
    this.type = localStorage.getItem('type');
    this.teacherAttribute = localStorage.getItem("flag");
    this.checkFlag = localStorage.getItem("checkFlag");
    this.list = ['一', '二', '三' ,'四' ,'五' ,'六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六']

    //this.echart.getMonth('lineChart');
    
    if (this.checkFlag == 'true') {
      $("#check").removeAttr("disabled");
    } else {
      $("#check").attr("disabled", "true");
    }



    $(".attendance-nav ul li").removeClass('active');
    $(".attendance-nav ul li").eq(0).addClass('active');
    if (this.type == 'teacher') {
      this.sendData = {"teacherID": localStorage.getItem("id")};
      const dataParams = new HttpParams().set("data", JSON.stringify(this.sendData));
      this.httpClient.post(this.basePath +'/course/selectCourseByTeacher', dataParams).subscribe(data => {
        if (data != null && data != '') {
          if (data['status'] == '200') {
            let info = data['data'];
            this.selectCourse = info['course'];
            this.selectClass = info['Class'];
          }
        }
      }, error => {
        this.appService.error("下拉框出错！");
      });
    }

  }

  //签到
  getCheck() {
    this.sendData = { "stuId": localStorage.getItem("id") };
    const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath + '/student/report', Params).subscribe(data => {
      console.log(data);
      if (data != null && data != '') {
        if (data['status'] == '200') {

        }
      }
    }, error => {

    });
  }

  //改变班级
  getChange() {
    for (let item of this.selectClass) {
      if (this.classHome  == item['teaClass']) {
        this.selectStudent = item['Student'];
      }
    }
  }

  //查询考勤情况
  selectAttendance() {
    console.log(this.classHome, this.studentHome, this.courseHome);
  }


}

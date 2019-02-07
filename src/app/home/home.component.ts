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
  type;
  sendData;
  constructor(private echart: EcharService, private activatedRoute: ActivatedRoute, private httpClient: HttpClient, private appService: AppService) {
    this.basePath = this.appService.getBasePath();
  }

  ngOnInit() {
    this.type = localStorage.getItem('type');
    this.list = ['一', '二', '三' ,'四' ,'五' ,'六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六']

    //this.echart.getMonth('lineChart');

    $(".attendance-nav ul li").removeClass('active');
    $(".attendance-nav ul li").eq(0).addClass('active');
    if (this.type == 'teacher') {
      this.sendData = {"teacherName": localStorage.getItem("name")};
      const dataParams = new HttpParams().set("data", JSON.stringify(this.sendData));
      this.httpClient.post(this.basePath +'/course/selectCourseByTeacher', dataParams).subscribe(data => {
        console.log(data);
        if (data != null && data != '') {
          if (data['status'] == '200') {
  
          }
        }
      }, error => {
        this.appService.error("下拉框出错！");
      });
    }
    

  }

}

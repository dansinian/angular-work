import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { count } from 'rxjs/internal/operators/count';

declare var $: any;
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {
  basePath;
  navinfoList = [];

  constructor(private appService: AppService, private httpClient: HttpClient) {
    this.basePath = this.appService.getBasePath();
  }

  ngOnInit() {
    this.httpClient.get(this.basePath + '/course/getCourse').subscribe(data => {
      if (data != null && data != '') {
        if (data['status'] == '200') {
          let course = data['course'];
          for (let item of course) {
            let major = [];
            for (let value of item['major']) {
              $.each(value, function(key) {
                major.push(key);
              });
            }
            this.navinfoList.push({
              "department": item['department'],
              "major": major
            });
          }
        }
      }
    }, error => {
      console.log("error");
    });
  }

  //点击切换专业
  getMajor(department, major) {
    let loginFlag = localStorage.getItem("loginFlag");
    if (loginFlag != "true") {
      this.appService.info("请先登录！");
    } else {
      
    }
  }

}

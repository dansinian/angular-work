import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { count } from 'rxjs/internal/operators/count';

declare var $: any;
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {
  @Output('nav') getNavValue = new EventEmitter<any>();
  navValue;
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

  updateQuestion(item, value) {
    this.navValue = {
      "deparament": item.department,
      "major": value
    }
    this.getNavValue.emit(JSON.stringify(this.navValue));
  }

  //????§Ý???
  getMajor(department, major) {
    let loginFlag = localStorage.getItem("loginFlag");
    if (loginFlag != "true") {
      this.appService.info("ÇëÏÈµÇÂ¼£¡");
    } else {
      
    }
  }

}

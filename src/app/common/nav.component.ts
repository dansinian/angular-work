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
      if (data != null && data !== '') {
        if (data['status'] === '200') {
          const course = data['course'];
          for (const item of course) {
            const major = [];
            for (const value of item['major']) {
              $.each(value, function(key) {
                major.push(key);
              });
            }
            this.navinfoList.push({
              'department': item['department'],
              'major': major
            });
          }
        }
      }
    }, error => {
      console.log('error');
    });
  }

  updateQuestion(item, value) {
    this.navValue = item.department + ',' + value;
    this.getNavValue.emit(this.navValue);
  }

  //
  getMajor(department, major) {
    const loginFlag = localStorage.getItem('loginFlag');
    if (loginFlag !== 'true') {
      this.appService.info('请先登录！');
    } else {

    }
  }

}

import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';

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
  userQuestionList = [];
  department;
  major;

  constructor(private appService: AppService, private httpClient: HttpClient, private route: Router, private activatedRoute: ActivatedRoute,
              private message: NzMessageService) {
    this.basePath = this.appService.getBasePath();
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.department = params['department'];
      this.major = params['major'];
    });

    this.loginFlag = localStorage.getItem('loginFlag');
    $('.header-left li').removeClass(); // active
    $('.header-left li').eq(0).addClass('active');
    // 获取admin帖子信息
    const adminParams = new HttpParams().set('data', JSON.stringify(''));
    this.httpClient.post(this.basePath + '/question/adminList', adminParams).subscribe(data => {
      if (data['status'] === '200') {
        this.adminQuestionList = data['questions'];
      }
    }, error => {
      console.log(error);
    });

    // 正常帖子信息
    if (!this.department && !this.major) {
      const recommendParams = new HttpParams().set('data', '');
      this.httpClient.post(this.basePath + '/question/recommendQuestion', recommendParams).subscribe(data => {
        if (data['status'] === '200') {
          this.userQuestionList = data['questions'];
        } else {
          this.userQuestionList = [];
        }
      }, error => {
        console.log('error');
      });

    } else {
      this.getDeparment();
    }


  }

  // 搜索
  getSearchValue(event) {
    this.sendData = { 'content': event };
    const Params = new HttpParams().set('data', JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath + '/question/selectQuestion', Params).subscribe(data => {
      if (data != null && data !== '') {
        if (data['status'] === '200') {
          this.userQuestionList = data['questions'];
        } else {
              this.message.error(data['msg']);
        }
      }
    }, error => {
      this.message.error('查询出错！');
    });
  }

  // 帖子详情
  positionQuestion(item) {
    if (this.loginFlag != 'true') {
      this.appService.info('请先登录！');
    } else {
      if (item.queId != null && item.queId != '') {
        this.route.navigate(['/questionContent'], {queryParams: {'questionId' : item.queId, 'userID': item.userId}});
      }
    }

  }

  // 根据院系显示
  getNavValue(event) {
    const arr = event.split(',');
    this.department = arr[0],
    this.major = arr[1];
    this.getDeparment();
  }

  // 获取左侧list
  getDeparment() {
    this.sendData = {
      'department': this.department,
      'major': this.major
    };
    const Params = new HttpParams().set('data', JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath + '/question/navigation', Params).subscribe(data => {
      if (data['status'] === '200') {
        this.userQuestionList = data['questions'][0];
      } else {
        this.userQuestionList = [];
      }
    }, error => {
      console.log('error');
    });
  }

}



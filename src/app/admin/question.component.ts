import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Question } from '../entity/question';

declare var $: any;
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html'
})
export class QuestionComponent implements OnInit {
  basePath;
  question: Question;
  searchValue;
  sendData;
  isVisibleUpdate = false; //修改Model
  infoList = [];

  constructor(private appService: AppService, private httpClient: HttpClient) {
    this.basePath = this.appService.getBasePath();
    this.question = {id:'', title:'', detail:'', userID:'', time:'', click:'', praise:'', reply:'', course:'', unread:'', src:'' };
  }

  ngOnInit() {
    //active
    $(".navigation li").removeClass();
    $(".navigation li").eq(3).addClass("active");
    const Params = new HttpParams().set("data", '');
    this.httpClient.post(this.basePath + '/question/selectQuestion', Params).subscribe(data => {
      if (data != null && data != '') {
        if (data['status'] == '200') {
          let questions = data['questions'];
          for (let question of questions) {
            this.infoList.push({
              "id": question['queId'],
              "title": question['queTitle'],
              "detail": question['queDetail'],
              "src": question['queImg'],
              "userID": question['userId'],
              "time": question['createTime'],
              "course": question['queCourse'],
              "click": question['clickCount'],
              "praise": question['praiseCount'],
              "reply": question['replyCount'],
            });
          }
        }
      }
    }, error => {
      console.log("error");
    });
  }

  //搜索信息
  getSearchInfo() {
    this.sendData = { "content": this.searchValue };
    const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath + '/question/selectQuestion', Params).subscribe(data => {
      if (data != null && data != '') {
        if (data['status'] == '200') {
          let questions = data['questions'];
          this.infoList = [];
          for (let question of questions) {
            this.infoList.push({
              "id": question['queId'],
              "title": question['queTitle'],
              "detail": question['queDetail'],
              "src": question['queImg'],
              "userID": question['userId'],
              "time": question['createTime'],
              "course": question['queCourse'],
              "click": question['clickCount'],
              "praise": question['praiseCount'],
              "reply": question['replyCount'],
            });
          }
        }
      }
    }, error => {
      console.log("error");
    });
  }

  //修改信息
  updateInfo(item) {
    this.question.id = item.id;
    this.question.title = item.title;
    this.question.detail = item.detail;
    this.question.userID = item.userID;
    this.question.course = item.course;
    this.question.src = item.src;
    this.isVisibleUpdate = true;
  }

  //保存修改信息
  handleUpdate() {
    this.sendData = {
      "questionId": this.question.id,
      "title": this.question.title,
      "detail": this.question.detail,
      "userId": this.question.userID,
      "queImg": this.question.src,
    }
    const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath + '/question/updateQuestion', Params).subscribe(data => {
      if (data != null && data != '') {
        if (data['status'] == '200') {
          this.appService.info(data['msg']);
          this.isVisibleUpdate = false;
          location.reload(true);
        } else {
          this.appService.info(data['msg']);
        }
      }
    }, error => {
      console.log("error");
    });
  }

  //删除信息
  deteleInfo(item) {
    this.sendData = { "questionId": item.id };
    const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath + '/question/deleteQuestion', Params).subscribe(data => {
      if (data != null && data != '') {
        if (data['status'] == '200') {
          this.appService.info(data['msg']);
          location.reload(true);
        } else {
          this.appService.info(data['msg']);
        }
      }
    }, error => {
      console.log("error");
    });
  }

  //关闭Model
  handleCancel() {
    this.isVisibleUpdate = false;
  }

}

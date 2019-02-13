import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Course } from '../entity/course';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { error } from 'selenium-webdriver';

declare var $: any;
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
})
export class CourseComponent implements OnInit {
  basePath;
  isVisibleEdit = false;
  isVisibleAdd = false;
  course: Course;
  sendData;
  infoList = [];
  searchCourse; //搜索的关键字信息

  constructor(private modalService: NzModalService, private appService: AppService, private httpClient: HttpClient, private route: Router) { 
    this.basePath = this.appService.getBasePath();
    this.course = {id: '', name: '', teaName: '', class: '', major: '', department: ''};
  }

  ngOnInit() {
    $(".nav-list ul li").removeClass("active");
    $(".nav-list ul li").eq(2).addClass("active");
    this.sendData = {"data": ""};
    const Params = new HttpParams().set("data", '');
    this.httpClient.post(this.basePath + '/course/selectCourse', Params).subscribe(data => {
      if (data != null && data != '') {
        if (data['status'] == '200') {
          let courseList = data['courses'];
          for (let value of courseList) {
            this.infoList.push({
              "id": value.id,
              "courseId": value.courseId,
              "teacher": value.courseName,
              "name": value.teaName,
              "class": value.courseClass,
              "major": value.courseMajor,
              "department": value.courseDepartment
            });
          }
        } else {
          this.appService.info(data['msg']);
        }
      }
    }, error => {
      this.route.navigate(['/error'],{queryParams: {'msg': "", 'title': "" }});
    });
  }

   //编辑信息
   editInfo(item) {
     console.log(item);
     this.course.id = item.courseId;
     this.course.name = item.name;
     this.course.teaName = item.teacher;
     this.course.major = item.major;
     this.course.class = item.class;
     this.course.department = item.department;
    this.isVisibleEdit = true;
  }

  //添加信息
  addInfo() {
    this.isVisibleAdd = true;
  }

  //修改内容
  handleEdit() {
    console.log(this.course.class);
    this.course.class.replace("，", ",");
    console.log(this.course.class);
    this.sendData = {
      "courseId": this.course.id,
      "courseName" : this.course.name,
      "teaName" : this.course.teaName,
      "courseClass" : this.course.class,
      "courseMajor" : this.course.major,
      "courseDepartment" : this.course.department
    };
    const Params = new HttpParams().set("data",JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath + '/course/updateCourse', Params).subscribe(data => {
      if (data != null && data != '') {
        if (data['status'] == '200') {
          this.appService.info(data['msg']);
          this.isVisibleEdit = false;
          location.reload(true);
        } else {
          this.appService.info(data['msg']);
        }
      }
    }, error => {
      this.appService.error("请检查代码！");
    });
    this.course = {id: '', name: '', teaName: '', class: '', major: '', department: ''};

    
  }

  //添加内容
  handleAdd() {
    console.log(this.course.class);
    this.course.class.replace("，", ",");
    console.log(this.course.class);

    this.sendData = {
      "courseName" : this.course.name,
      "teaName" : this.course.teaName,
      "courseClass" : this.course.class,
      "courseMajor" : this.course.major,
      "courseDepartment" : this.course.department
    };
    const Params = new HttpParams().set("data",JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath + '/course/createCourse', Params).subscribe(data => {
      if (data != null && data != '') {
        if (data['status'] == '200') {
          this.appService.info(data['msg']);
          this.isVisibleAdd = false;
          location.reload(true);
        } else {
          this.appService.info(data['msg']);
        }
      }
    }, error => {
      this.appService.error("请检查代码！");
    });
    this.course = {id: '', name: '', teaName: '', class: '', major: '', department: ''};

    
  }

  //删除确认
  deleteConfirm(ID) {
    console.log(ID);
    this.sendData = {"courseId": ID};
    const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
    this.modalService.confirm({
      nzTitle     : '你确定删除此条信息？',
      nzOkText    : '是',
      nzOkType    : 'danger',
      nzOnOk      : () => {
        this.httpClient.post(this.basePath + '/course/deleteCourse', Params).subscribe( data => {
          if (data != null && data != '') {
            if (data['status'] == '200') {
              this.appService.info(data['msg']);
              location.reload(true);
            } else {
              this.appService.info(data['msg']);
            }
          }
        }, error => {
            this.appService.error('删除失败,请检查代码!');
        });
      },
      nzCancelText: '取消',
      nzOnCancel  : () => {}
    });
  }

  //搜索课程
  getCourse() {
    this.sendData = {"content": this.searchCourse };
    const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath + '/course/selectCourse', Params).subscribe(data => {
      console.log(data);
      if (data != null && data != '') {
        this.infoList = [];
        if (data['status'] == '200') {
          let courseList = data['courses'];
          for (let value of courseList) {
            this.infoList.push({
              "id": value.id,
              "courseId": value.courseId,
              "teacher": value.courseName,
              "name": value.teaName,
              "class": value.courseClass,
              "major": value.courseMajor,
              "department": value.courseDepartment
            });  
          }
        } else {
          this.appService.info(data['msg']);
        }
      }
    }, error => {
      this.appService.error("查询出错！");
    });
  
  }

  //取消模态框
  cancelEdit() { this.isVisibleEdit = false; }
  cancelAdd() { this.isVisibleAdd = false; }

}

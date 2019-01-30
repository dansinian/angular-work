import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Course } from '../entity/course';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';

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

  constructor(private modalService: NzModalService, private appService: AppService, private httpClient: HttpClient, private route: Router) { 
    this.basePath = this.appService.getBasePath();
    this.course = {id: '', name: '', teaName: '', class: '', major: '', department: ''};
  }

  ngOnInit() {
    $(".nav-list ul li").removeClass("active");
    $(".nav-list ul li").eq(2).addClass("active");
  }

   //编辑信息
   editInfo() {
    this.isVisibleEdit = true;
  }

  //添加信息
  addInfo() {
    this.isVisibleAdd = true;
  }

  //修改内容
  handleEdit() {
    this.isVisibleEdit = false;
  }

  //添加内容
  handleAdd() {
    this.sendData = {
      "courseId" : this.course.id,
      "courseName" : this.course.name,
      "teaName" : this.course.teaName,
      "courseClass" : this.course.class,
      "courseMajor" : this.course.major,
      "courseDepartment" : this.course.department
    };
    const Params = new HttpParams().set("data",JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath + '/course/createCourse', Params).subscribe(data => {
      console.log(data);
      if (data != null && data != '') {
        if (data['status'] == '200') {
          this.appService.info(data['msg']);
          this.isVisibleAdd = false;
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
  deleteConfirm() {
    this.modalService.confirm({
      nzTitle     : '你确定删除此条信息？',
      nzOkText    : '是',
      nzOkType    : 'danger',
      nzOnOk      : () => console.log('OK'),
      nzCancelText: '取消',
      nzOnCancel  : () => {}
    });
  }

  //取消模态框
  cancelEdit() { this.isVisibleEdit = false; }
  cancelAdd() { this.isVisibleAdd = false; }

}

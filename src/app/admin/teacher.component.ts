import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppService } from 'src/app/app.service';
import { Teacher } from '../entity/teacher';

declare var $: any;
@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html'
})
export class TeacherComponent implements OnInit {
  isVisibleEdit = false;
  isVisibleAdd = false;
  basePath;
  sendData;
  teacher: Teacher;

  constructor(private modalService: NzModalService, private httpClient: HttpClient, private appService: AppService) {
    this.basePath = this.appService.getBasePath();
    this.teacher = {id: '',name: '',password: '123456', flag: '', gender: '', department: '', phone: '', class: ''};
  }

  ngOnInit() {
    $(".nav-list ul li").removeClass("active");
    $(".nav-list ul li").eq(1).addClass("active");
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
      "teacherId": this.teacher.id,
      "teacherName": this.teacher.name,
      "teacherGender": this.teacher.gender,
      "teacherDepartment": this.teacher.department,
      "teacherPhone": this.teacher.phone,
      "teacherClass": this.teacher.class,
      "teacherPassword": this.teacher.password,
      "teacherFlag": this.teacher.flag,
    };
    const Params = new HttpParams().set("data",JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath + '/teacher/createTeacher', Params).subscribe(data =>{
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
      this.appService.error("代码出错，请检查！");
    });
    this.teacher = {id: '',name: '',password: '123456', flag: '', gender: '', department: '', phone: '', class: ''};
    
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

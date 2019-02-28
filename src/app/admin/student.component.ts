import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { NzModalService } from 'ng-zorro-antd';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Student } from '../entity/student';

declare var $: any;
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html'
})
export class StudentComponent implements OnInit {
  isVisibleUpdate = false;
  isVisibleAdd = false;
  basePath;
  infoList = [];
  student: Student;
  sendData;
  searchInfo;

  constructor(private appService: AppService, private modalService: NzModalService, private httpClient: HttpClient) { 
    this.basePath = this.appService.getBasePath();
    this.student = {id: '', name: '', gender: '', phone: '', class: '', major: '', department: '', password: '', nickname: '', img: ''};
  }

  ngOnInit() {
      
  }

  //显示添加学生Model
  addInfo() {
    this.isVisibleAdd = true;
  }

  //添加学生信息
  handleAdd() {
    this.isVisibleAdd = false;
  }

  //显示修改Model
  updateInfo() {
    this.isVisibleUpdate = true;
  }

  //保存修改信息
  handleUpdate() {
    this.isVisibleUpdate = false;
  }

  //取消Model
  handleCancel() {
    this.isVisibleAdd = false;
    this.isVisibleUpdate = false;
  }

}

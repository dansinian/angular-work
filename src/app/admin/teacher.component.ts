import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppService } from 'src/app/app.service';
import { User } from '../entity/user';

declare var $: any;
@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html'
})
export class TeacherComponent implements OnInit {
  isVisibleUpdate = false;
  isVisibleAdd = false;
  basePath;
  sendData;
  user: User;
  infoList = [];
  searchInfo;

  constructor(private modalService: NzModalService, private httpClient: HttpClient, private appService: AppService) {
    this.basePath = this.appService.getBasePath();
    this.user = {id: '', name: '', phone: '', major: '', department: '', password: '', nickname: '', img: '', autograph: '', type: ''};
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

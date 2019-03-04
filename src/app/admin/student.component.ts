import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { NzModalService } from 'ng-zorro-antd';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../entity/User';

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
  user: User;
  sendData;
  searchInfo;

  constructor(private appService: AppService, private modalService: NzModalService, private httpClient: HttpClient) { 
    this.basePath = this.appService.getBasePath();
    this.user = {id: '', name: '', phone: '', major: '', department: '', password: '', nickname: '', img: '', autograph: '', type: ''};
  }

  ngOnInit() {
    //active
    $(".navigation li").removeClass();
    $(".navigation li").eq(0).addClass("active");
      console.log(this.user);
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

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

  //��ʾ���ѧ��Model
  addInfo() {
    this.isVisibleAdd = true;
  }

  //���ѧ����Ϣ
  handleAdd() {
    this.isVisibleAdd = false;
  }

  //��ʾ�޸�Model
  updateInfo() {
    this.isVisibleUpdate = true;
  }

  //�����޸���Ϣ
  handleUpdate() {
    this.isVisibleUpdate = false;
  }

  //ȡ��Model
  handleCancel() {
    this.isVisibleAdd = false;
    this.isVisibleUpdate = false;
  }

}

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
  isVisibleEdit = false;
  isVisibleAdd = false;
  basePath;
  infoList = [];
  student: Student;
  sendData;
  searchInfo;

  constructor(private appService: AppService, private modalService: NzModalService, private httpClient: HttpClient) { 
    this.basePath = this.appService.getBasePath();
  }

  ngOnInit() {
      
  }

}

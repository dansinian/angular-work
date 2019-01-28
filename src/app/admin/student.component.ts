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
  studentList = [];
  student: Student;

  constructor(private appService: AppService, private modalService: NzModalService, private httpClient: HttpClient) { 
    this.basePath = this.appService.getBasePath();
    this.student = {id: '', name: '', identity: '', phone: '', class: '', major: '', department: '', guide: '', schedule: ''};
  }

  ngOnInit() {
      $(".nav-list ul li").removeClass("active");
      $(".nav-list ul li").eq(0).addClass("active");
      this.httpClient.get(this.basePath + 'student/selectStudent').subscribe(data => {
          if (data['msg'] == '' && data['status'] == '200') {

          } else{
            this.appService.info(data['msg']);
          }
      }, error => {

      })
  }

  //编辑信息
  editInfo(ID) {
      this.isVisibleEdit = true; //弹框显示
      const Params = new HttpParams().set('data', JSON.stringify(ID));
      this.httpClient.post(this.basePath + 'student/selectStudent', Params).subscribe(data => {
        if (data != null) {
          if (data['msg'] == '') {

          }
        }
      },error => {

      })
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
    this.isVisibleAdd = false;
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

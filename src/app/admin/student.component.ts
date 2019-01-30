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
  sendData;

  constructor(private appService: AppService, private modalService: NzModalService, private httpClient: HttpClient) { 
    this.basePath = this.appService.getBasePath();
    this.student = {id: '', name: '', identity: '', password: '123456', phone: '', class: '', major: '', department: '', guideName: '', schedule: '', gender: '', flag: '1'};
  }

  ngOnInit() {
      $(".nav-list ul li").removeClass("active");
      $(".nav-list ul li").eq(0).addClass("active");
      const Params = new HttpParams().set("data","");
      this.httpClient.post(this.basePath + '/student/selectStudent', Params).subscribe(data => {
        console.log(data);
          if (data['msg'] == '' && data['status'] == '200') {

          } else{
            this.appService.info(data['msg']);
          }
      }, error => {
          this.appService.error("查询出错");
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
    this.sendData = {
      'studentId': this.student.id,
      'studentName': this.student.name,
      'studentGender': this.student.gender,
      'studentIdentity': this.student.identity,
      'studentPhone': this.student.phone,
      'studentClass': this.student.class,
      'studentMajor': this.student.major,
      'studentDepartment': this.student.department,
      'teacherName': this.student.guideName,
      'studentPassword': this.student.password,
      'studentFlag': this.student.flag,
      'schedule': this.student.schedule,
    };
    const Params = new HttpParams().set("data",JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath + '/student/createStudent', Params).subscribe(data => {
        if (data != null || data != '') {
          if (data['status'] == '200') {
            this.appService.info(data['msg']);
          } else {
            this.appService.info(data['msg']);
          }
        }
    }, error => {
        this.appService.error("请检查代码！");
    });

    this.student = {id: '', name: '', identity: '', password: '123456', phone: '', class: '', major: '', department: '', guideName: '', schedule: '', gender: '', flag: '1'};


    this.isVisibleAdd = false;
  }

  //删除确认
  deleteConfirm() {
    let id="2511150442";
    this.sendData = {"studentId" : id };
    const Params = new HttpParams().set("data",JSON.stringify(this.sendData));

    this.modalService.confirm({
      nzTitle     : '你确定删除此条信息？',
      nzOkText    : '是',
      nzOkType    : 'danger',
      nzOnOk      : () => {
        this.httpClient.post(this.basePath + '/student/deleteStudent', Params).subscribe(data => {
          console.log(data);
          if (data != null && data != '') {
            if (data['status'] == '200') {
              this.appService.info("删除成功!");
              this.isVisibleAdd = false;
            } else {
              this.appService.info("删除失败");
            }
          }
        }, error => {
          this.appService.error("未删除！");
        });

      },
      nzCancelText: '取消',
      nzOnCancel  : () => {}
    });
  }

  //取消模态框
  cancelEdit() { this.isVisibleEdit = false; }
  cancelAdd() { this.isVisibleAdd = false; }

}

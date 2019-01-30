import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';

declare var $: any;
@Component({
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html'
})
export class LeaveListComponent implements OnInit {
  basePath;
  isVisibleEdit = false;
  isVisibleAdd = false;
  leave: Leave;
  sendData;

  constructor(private modalService: NzModalService, private appService: AppService, private httpClient: HttpClient, private route: Router) {
    this.basePath = this.appService.getBasePath();
    this.leave = {id: '',stuId: '', stuName: '',startTime: '',guideTea: '',applicationTime: '',endTime: '',day: '', courTea: '',status: '',reason: ''};
  }

  ngOnInit() {
    $(".nav-list ul li").removeClass("active");
    $(".nav-list ul li").eq(3).addClass("active");
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
      "leaveId": this.leave.id,
      "StuId": this.leave.stuId,
      "applicationTime": this.appService.getDate(this.leave.applicationTime),
      "startTime": this.appService.getDate(this.leave.startTime),
      "endTime": this.appService.getDate(this.leave.endTime),
      "leaveDay": this.leave.day,
      "approvalTea": this.leave.guideTea,
      "leaveCourseTea": this.leave.courTea
    };
    console.log(this.sendData);
    const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath + '/leave/createLeave', Params).subscribe(data => {
      console.log(data);
      if (data != null && data != '') {
        if (data['msg'] == '200') {
          this.appService.info(data['msg']);
          this.isVisibleAdd = false;
        } else {
          this.appService.info(data['msg']);
        }
      }
      this.leave = {id: '',stuId: '', stuName: '',startTime: '',guideTea: '',applicationTime: '',endTime: '',day: '', courTea: '',status: '',reason: ''};
    }, error => {
      this.appService.error("请检查代码！");
    });
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

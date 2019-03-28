import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Leave } from '../entity/leave';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';

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
  infoList = [];
  searchInfo;
  nzNoResult = "正在加载。。。";
  pageLoading = true;

  constructor(private modalService: NzModalService, private appService: AppService, private httpClient: HttpClient, private route: Router) {
    this.basePath = this.appService.getBasePath();
    this.leave = {id: '',stuId: '', stuName: '',startTime: '',guideTea: '',applicationTime: '',endTime: '',day: '', courTea: '',status: '',reason: ''};
  }

  ngOnInit() {
    $(".nav-list ul li").removeClass("active");
    $(".nav-list ul li").eq(3).addClass("active");
    const Params = new HttpParams().set("data","");
    this.httpClient.post(this.basePath + '/leave/selectLeave', Params).subscribe(data => {
      if (data != null && data != '') {
        console.log(data);
        if (data['status'] == '200') {
          this.infoList = data['leaves'];
          this.pageLoading = false;
        } else {
          this.appService.info(data['msg']);
        }
      }
    }, error => {
      this.appService.error("查询出错！");
    });
  }

  getSearch() {
    this.pageLoading = true;
    this.sendData = {"content": this.searchInfo, "type": "student"};
    const Params = new HttpParams().set("data",JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath + '/leave/selectLeave', Params).subscribe(data => {
      if (data != null && data != '') {
        this.infoList = [];
        if (data['status'] == '200') {
          this.infoList = data['leaves'];
          this.pageLoading = false;
        }
      }
    }, error => {
      this.appService.error("查询出错！");
    });
  }

  
  //删除确认
  deleteConfirm(ID) {
    this.sendData = {"leaveId": ID};
    const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
    this.modalService.confirm({
      nzTitle     : '你确定删除此条信息？',
      nzOkText    : '是',
      nzOkType    : 'danger',
      nzOnOk      : () => {
        this.httpClient.post(this.basePath + '/leave/deleteLeave', Params).subscribe(data => {
          if (data != null && data != '') {
            if (data['status'] == '200') {
              this.appService.succcess(data['msg']);
              location.reload(true);
            }
          }
        }, error => {
          this.appService.error("删除出错！");
        });
      },
      nzCancelText: '取消',
      nzOnCancel  : () => {}
    });
  }

}

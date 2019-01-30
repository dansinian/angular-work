import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CourArragent } from '../entity/cour_arragent';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

declare var $: any;
@Component({
  selector: 'app-course-arrangement',
  templateUrl: './course-arrangement.component.html'
})
export class CourseArrangementComponent implements OnInit {
    basePath;
    sendData;
    arragent: CourArragent;
    isVisibleEdit = false;
    isVisibleAdd = false;
    carmTime;

    constructor(private modalService: NzModalService, private appService: AppService, private httpClient: HttpClient, private route: Router) {
      this.basePath = this.appService.getBasePath();
      this.arragent = {id: '', time: '', courId: '', courName: ''};
    }

    ngOnInit() {
      $(".nav-list ul li").removeClass("active");
      $(".nav-list ul li").eq(4).addClass("active");
    }

    //编辑信息
    editInfo() {
      this.arragent = {id: '2222', time: '2019-01-18 21:42:24 - 2019-01-19 21:42:24', courId: '1234', courName: 'dvdsvdvsdvsd'};
      
      
      this.isVisibleEdit = true;
    }

    //添加信息
    addInfo() {
      
      this.isVisibleAdd = true;
    }

    //修改内容
    handleEdit() {
      this.arragent.time = this.appService.getDate(this.carmTime[0]) + " - " + this.appService.getDate(this.carmTime[1]);
      this.sendData = {
        "arragementId" : this.arragent.id,
        "carmTime" : this.arragent.time,
        "courseId" : this.arragent.courId,
      };
      console.log(this.sendData);
      const Params = new HttpParams().set("data",JSON.stringify(this.sendData));
      this.httpClient.post(this.basePath + '/arrangement/updateArrangement', Params).subscribe(data => {
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
        this.appService.error("请检查代码！");
      });
    }

    //添加内容
    handleAdd() {
      this.arragent.time = this.appService.getDate(this.carmTime[0]) + " - " + this.appService.getDate(this.carmTime[1]);
      this.sendData = {
        "arragementId" : this.arragent.id,
        "carmTime" : this.arragent.time,
        "courseId" : this.arragent.courId,
      };
      console.log(this.sendData);
      const Params = new HttpParams().set("data",JSON.stringify(this.sendData));
      this.httpClient.post(this.basePath + '/arrangement/createArrangement', Params).subscribe(data => {
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
        this.appService.error("请检查代码！");
      });
      
    }
    //删除确认
    deleteConfirm() {
      let id="11111";
      this.sendData = {"arragementId" : id };
      const Params = new HttpParams().set("data",JSON.stringify(this.sendData));
      
      this.modalService.confirm({
        nzTitle     : '你确定删除此条信息？',
        nzOkText    : '是',
        nzOkType    : 'danger',
        nzOnOk      : () => {
          this.httpClient.post(this.basePath + '/arrangement/deleteArrangement', Params).subscribe(data => {
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

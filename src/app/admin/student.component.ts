import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { NzModalService } from 'ng-zorro-antd';

declare var $: any;
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html'
})
export class StudentComponent implements OnInit {
  isVisibleEdit = false;
  isVisibleAdd = false;

  constructor(private appService: AppService, private modalService: NzModalService) { }

  ngOnInit() {
    $(".nav-list ul li").removeClass("active");
    $(".nav-list ul li").eq(0).addClass("active");
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

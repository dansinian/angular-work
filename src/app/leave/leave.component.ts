import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Leave } from '../entity/leave';

declare var $: any;
@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html'
})
export class LeaveComponent implements OnInit {
  basePath;
  type;
  sendData;
  leave: Leave;
  startTime;
  endTime;

  constructor(private appservice: AppService, private httpClient: HttpClient, private route: Router) {
      this.basePath = this.appservice.getBasePath();
  }

  ngOnInit() {
    this.type = localStorage.getItem("user");
    $(".attendance-nav ul li").removeClass('active');
    $(".attendance-nav ul li").eq(1).addClass('active');
    this.leave = {id: '',stuId: '', stuName: '',startTime: '',guideTea: '',applicationTime: '',endTime: '',day: '', courTea: '',status: '',reason: ''};
  }

  onSubmit() {
    this.leave.applicationTime = this.appservice.getDate(new Date());
    this.leave.endTime = this.appservice.getDate(this.endTime);
    this.leave.startTime = this.appservice.getDate(this.startTime);
    this.sendData = {
      "StuId": this.leave.stuId,
      "StuName": this.leave.stuName,
      "endTime": this.leave.endTime,
      "startTime": this.leave.startTime,
      "applicationTime": this.leave.applicationTime,
      "leaveDay": this.leave.day,
      "approvalTea": this.leave.guideTea,
      "leaveCourseTea": this.leave.courTea,
      "leaveReason": this.leave.reason,
    };
    const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath + '/leave/createLeave', Params).subscribe(data => {
      if (data != null && data != '') {
        if (data['status'] == '200') {
            let params = data['leave'];
            localStorage.setItem("phone", data['guidePhone']);
            // this.leave.id = params['leaveId'];
            // this.leave.stuId = params['stuId'];
            this.route.navigate(['/detail'], {queryParams: {'leaveID': params['leaveId'],'stuID': params['stuId']} });
        } else {
          this.appservice.info(data['msg']);
        }
      }
    }, error => {
      this.appservice.error("ÐÂ½¨³ö´í");
    });
  }
}

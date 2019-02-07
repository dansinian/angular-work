import { Component, OnInit } from '@angular/core';
import { EcharService } from '../common/echar.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppService } from 'src/app/app.service';


declare var $: any;
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {
  basePath;
  type;
  sendData;
  personInfo;
  scheduleInfo = [];

  constructor(private echartService: EcharService, private httpClient: HttpClient, private appService: AppService) {
    this.basePath = this.appService.getBasePath();
  }

  ngOnInit() { 
      this.type = localStorage.getItem("type");
      $("#info-jk-tab li").on('click', function() {
          $("#info-jk-tab li").removeClass('active');
          $(this).addClass('active');
          let aid = $(this).attr('aid');
          $(".infojk").addClass('hide');
          $("#person"+aid).removeClass("hide");
      });
      this.sendData = {"content": localStorage.getItem("id")};
      const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
      if (this.type == 'student') {
        this.httpClient.post(this.basePath +'/student/selectStudent', Params).subscribe(data => {
          if (data != null && data != '') {
            if (data['status'] == '200') {
              this.personInfo  = data['students'][0];
              let schedule = this.personInfo['schedule'];
              console.log(schedule);
              schedule = schedule.replace("£¬",",");
              let arr = schedule.split(",");
              for (let item of arr) {
                this.scheduleInfo.push({
                  "value": item
                });
              }
            } else {
              this.appService.info(data['msg']);
            }
          }
        }, error => {

        });
      } else {
        this.httpClient.post(this.basePath +'/teacher/selectTeacher', Params).subscribe(data => {
          console.log("teacher",data);
          if (data != null && data != '') {
            if (data['msg'] == '200') {

            } else {
              this.appService.info(data['msg']);
            }
          }
        }, error => {

        });
      }

      //this.echartService.getAxis("infojk-result");
  }

}

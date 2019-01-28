import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html'
})
export class LeaveComponent implements OnInit {
  basePath;
  type;
  startTime;

  constructor(private appservice: AppService, private httpClient: HttpClient, private route: Router) {
      this.basePath = this.appservice.getBasePath();
  }

  ngOnInit() {
    this.type = localStorage.getItem("user");
    $(".attendance-nav ul li").removeClass('active');
    $(".attendance-nav ul li").eq(1).addClass('active');
  }

  onSubmit() {
    if (this.startTime == null || this.startTime == '') {
      this.appservice.info("检查信息重新提交");
    } else {
      console.log(this.appservice.getDate(this.startTime));
      const Params = new HttpParams().set("data",JSON.stringify(""));
      this.httpClient.get(this.basePath + '/leave/createLeave').subscribe(data => {
          if (data['msg'] == '') {


            this.route.navigate(['/detali']);

          }
      }, error => {
          this.appservice.error("错误提示！");
      });
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../app.service';
import { Router } from '@angular/router';


declare var $: any;
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {
  basePath;
  user;
  isVisibleUpdate = false; //ģ̬��
  isVisiblenotice = false; //ģ̬��

  constructor(private httpClient: HttpClient, private appService: AppService, private route: Router) {
    this.basePath = this.appService.getBasePath();
  }

  ngOnInit() {
    this.user = localStorage.getItem("user");
    $(".attendance-nav ul li").removeClass('active');
    $(".attendance-nav ul li").eq(2).addClass('active');
  }

  //�޸������Ϣ����ѯ��
  updateApply(ID) {
    this.isVisibleUpdate = true;

    // this.httpClient.post(this.basePath + '/leave/select', {"data": "data"}).subscribe(data => {

    //     if (data['msg'] == '') {
    //         //this.loginGuard.canActivate( true );
    //     }

    // },
    // error => {
    //     this.route.navigate(['/error'], {queryParams: {'msg': 'http����ʧ��', 'title': ''}});
    //   }
    // );  

  }
  //ģ̬��ȡ����ȡ���޸ģ�
  handleCancel() {
    this.isVisibleUpdate = false;
  }
  //�����޸ĵ���Ϣ
  saveUpdateApply() {
    this.isVisibleUpdate = false;
  }

  //֪ͨ��ʦ�����Ϣ
  noticeTeach(ID) {
    this.httpClient.post(this.basePath + '/leave/select', {"data": "data"}).subscribe(data => {

      if (data['msg'] == '') {
          //this.loginGuard.canActivate( true );
      }
      this.appService.succcess();

    },error => {
      this.appService.error("");
        //this.route.navigate(['/error'], {queryParams: {'msg': 'http����ʧ��', 'title': ''}});
    }
    );  
  }

}

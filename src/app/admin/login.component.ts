import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { Admin } from '../entity/admin';
import { stagger } from '@angular/animations/src/animation_metadata';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  basePath;
  admin: Admin;
  sendData;

  constructor(private httpClient: HttpClient, private appService: AppService, private route: Router) { 
    this.basePath = this.appService.getBasePath();
    this.admin = {account: '', password: '', type: '', flagLogin: true};
  }

  ngOnInit() {
    
  }

  //登录
  login() {
    this.sendData = {
      "account": this.admin.account,
      "password": this.admin.password,
      "type": "admin"
    }
    const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath + '/admin/loginAdmin', Params).subscribe(data => {
      if (data != null && data != '') {
        if (data['status'] == '200') {
          this.route.navigate(['/admin/student']);
        }
      }
    }, error => {
      
    });

  }

}

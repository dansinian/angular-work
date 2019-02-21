import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { User } from '../entity/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  basePath;
  user: User;

  constructor(private httpClient: HttpClient, private appService: AppService, private route: Router) { 
    this.basePath = this.appService.getBasePath();
    this.user = {account: '', password: '', type: '', flagLogin: true};
  }

  ngOnInit() {
    
  }

}

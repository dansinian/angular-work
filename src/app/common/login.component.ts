import {Component, OnInit, ElementRef} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { User } from './user';



declare var $: any;
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    user: User;
    basePath;
    //locationHref = true;

    constructor(private el: ElementRef, private httpClient: HttpClient, private appService: AppService, private route: Router) {
        this.basePath = this.appService.getBasePath();
    }
  
    ngOnInit(): void {
        this.user = {account: "", password: "", type: "student"};
        localStorage.setItem("user", "teacher");
    }
    

    // 登录账户
    login(): void {
        // let data = {
        //     "account": this.account,
        //     "password": this.password,
        //     "type": this.type
        // };
       
       // const Params = new HttpParams().set('data', data);
        // this.httpClient.post(this.basePath + '/user/loginUser', {"data": data}).subscribe(data => {

        //     if (data['msg'] == '') {
               
        //     }

        // }, error => {
        //     this.route.navigate(['/error'], {queryParams: {'msg': 'http请求失败', 'title': ''}});
        // });
        
        alert(this.user.account);
       // const accountStr: string = JSON.stringify(this.user);
        sessionStorage.setItem( 'account', "2511150329" );
        this.route.navigateByUrl('/home'); 
    }



}

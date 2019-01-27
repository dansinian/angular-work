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
        this.user = {account: "", password: "", type: "student", flagLogin: true};
        localStorage.setItem("user", "teacher");
    }
    

    // 登录账户
    login(): void {
        let data = {
            "account": this.user.account,
            "password": this.user.password,
            "type": this.user.type
        };
   const Params = new HttpParams().set('data', JSON.stringify(data));
     // let headers = new Headers();
      //headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      console.log({"data": data});
        this.httpClient.post(this.basePath + '/user/loginUser', Params ).subscribe(data => {
            console.log(data);   

            if (data['msg'] == '' && data['status'] == "200") {
                this.user.flagLogin = false;
                this.route.navigate(['/home'],{queryParams: {"type": this.user.type}}); 
            }

        }, error => {
            this.route.navigate(['/error'], {queryParams: {'msg': 'http请求失败', 'title': ''}});
        });
        
    //     alert(this.user.account);
    //    // const accountStr: string = JSON.stringify(this.user);
    //     sessionStorage.setItem( 'account', "2511150329" );
    //     this.route.navigateByUrl('/home'); 
    }



}

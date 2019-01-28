import {Component, OnInit, ElementRef} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { User } from '../entity/user';



declare var $: any;
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    user: User;
    basePath;
    type;
    //locationHref = true;

    constructor(private el: ElementRef, private httpClient: HttpClient, private appService: AppService, private route: Router) {
        this.basePath = this.appService.getBasePath();
    }
  
    ngOnInit(): void {
        this.user = {account: "", password: "", type: "", flagLogin: true};
    }
    

    // 登录账户
    login(): void {
        if ((this.user.account == null || this.user.account == "") && (this.user.password == null || this.user.password == "")) {
            this.appService.info("账户和密码都不能为空，请检查重新登录！");
        } else {
            this.user.type = this.type;
            let data = {
                "account": this.user.account,
                "password": this.user.password,
                "type": this.user.type
            };
            localStorage.setItem("user", this.type);
            const Params = new HttpParams().set('data', JSON.stringify(data));
            this.httpClient.post(this.basePath + '/user/loginUser', Params ).subscribe(data => {
                if (data['msg'] == '' && data['status'] == "200") {
                    this.user.flagLogin = false;
                    this.route.navigate(['/home'],{queryParams: {"type": this.user.type}}); 
                } else {
                    this.appService.info(data['msg']);
                }
    
            }, error => {
                this.appService.error("登录出错，请检查！");
                //this.route.navigate(['/error'], {queryParams: {'msg': 'http请求失败', 'title': ''}});
            });
        }
        
    }



}

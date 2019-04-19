import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { User } from '../entity/user';

@Component({
    selector: 'app-loginteacher',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    basePath;
    user: User;

    constructor(private el: ElementRef, private httpClient: HttpClient, private appService: AppService, private route: Router) {
        this.basePath = this.appService.getBasePath();
    }

    ngOnInit(): void {
        this.user = { account: "", password: "", flagLogin: true, type: "admin" };
    }

    loginAdmin() {
        if ((this.user.account == null || this.user.account == '') && (this.user.password == null || this.user.password == '')) {
            this.appService.info("账户和密码都不能为空，请检查重新登录！");
        } else {
            let data = { "account": this.user.account, "password": this.user.password, "type": this.user.type };
            const Params = new HttpParams().set('data', JSON.stringify(data));
            this.httpClient.post(this.basePath + '/user/loginUser', Params).subscribe(data => {
                if (data['msg'] == '') {
                    this.route.navigate(['/admin/student']);
                } else {
                    this.appService.info(data['msg']);
                }
            }, error => {
                this.appService.error("你不是该系统的管理员！");
            });
        }
    }

}

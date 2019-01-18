import {Component, OnInit, ElementRef} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
//import { LoginGuard } from './login.guard';


declare var $: any;
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    account;
    password;
    type;
    basePath;
    locationHref = true;

    validateForm: FormGroup;
    constructor(private fb: FormBuilder, private el: ElementRef, private httpClient: HttpClient, private appService: AppService, private route: Router) {
        this.basePath = this.appService.getBasePath();
    }
  
    ngOnInit(): void {
        localStorage.setItem("user", "teacher");
        this.validateForm = this.fb.group({
            account: [ null ],
            password: [ null ],
            type: [ null],
            remember: [ true ]
        });
        if (window.location.href.indexOf('admin') >= 0) {
            this.locationHref = false;
        }

        $(".header").hide();
    }

    getType (value): void {
        this.type = value;
    }

    // 登录账户
    submitForm(): void {
        this.account = this.el.nativeElement.querySelector('#account').value;
        this.password = this.el.nativeElement.querySelector('#password').value;
        let data = {
            "account": this.account,
            "password": this.password,
            "type": this.type
        };
        if (!this.locationHref) {
            console.log('admin');
            data.type = 'admin';
        }
        console.log(data);
       // const Params = new HttpParams().set('data', data);
        this.httpClient.post(this.basePath + '/user/loginUser', {"data": data}).subscribe(data => {

            if (data['msg'] == '') {
                //this.loginGuard.canActivate( true );
            }

        }, error => {
            this.route.navigate(['/error'], {queryParams: {'msg': 'http请求失败', 'title': ''}});
        });      
    }



}

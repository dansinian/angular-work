import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { Admin } from '../entity/admin';
import { FileUploader } from 'ng2-file-upload';

import { NzMessageService, UploadFile, UploadXHRArgs  } from 'ng-zorro-antd';
import { filter } from 'rxjs/operators';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  basePath;
  admin: Admin;
  sendData;
  uploader;  //上传文件
  aaa;
  uploading = false;
  fileList: UploadFile[] = [];

  beforeUpload = (file: UploadFile): boolean => {
    console.log(file);
    this.fileList = this.fileList.concat(file);
    return false;
  };

  constructor(private httpClient: HttpClient, private appService: AppService, private route: Router,  private msg: NzMessageService) { 
    this.basePath = this.appService.getBasePath();
    this.admin = {account: '', password: '', type: '', flagLogin: true};
  }

  ngOnInit() {
    this.uploader = new FileUploader({ 
      url: this.basePath + "/uploadFile", 
      method: "POST", 
      itemAlias: "uploadedfile",
      autoUpload: false,
     });  
  }

  handleUpload(): void {
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    this.fileList.forEach((file: any) => {
      formData.append('files[]', file);
    });
    this.uploading = true;

    console.log(formData, this.fileList);

    // You can use any AJAX library you like
    const req = new HttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts/', formData, {
      // reportProgress: true
    });
    console.log(req);
    // this.httpClient.request(req).pipe(filter(e => e instanceof HttpResponse)).subscribe(
    //     () => {
    //       this.uploading = false;
    //       this.fileList = [];
    //       this.msg.success('upload successfully.');
    //     },
    //     () => {
    //       this.uploading = false;
    //       this.msg.error('upload failed.');
    //     }
    //   );
  }

  selectedFileOnChanged(event) {
    console.log(event);
    console.log(event.target.value);
    console.log(this.aaa);
  }

  //登录
  login() {
    if (this.admin.account != '' && this.admin.account != null && this.admin.password != '' && this.admin.password != null) {
      this.sendData = {
        "adminId": this.admin.account,
        "passWord": this.admin.password,
      }
      const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
      this.httpClient.post(this.basePath + '/admin/loginAdmin', Params).subscribe(data => {
        if (data != null && data != '') {
          if (data['status'] == '200') {
            localStorage.setItem("id",data['admin']['adminId']);
            localStorage.setItem("pass",data['admin']['adminPass']);
            localStorage.setItem("userFlag", "adminUser");
            this.route.navigate(['/admin/student']);
          }
        }
      }, error => {
        this.appService.error("登录失败！");
      });
    } else {
      this.appService.info("账户和密码不能为空");
    }

  }

}

import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import {NzMessageService, UploadFile} from 'ng-zorro-antd';
import {Observable, Observer} from 'rxjs';

declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  @Output('search') getSearchValue = new EventEmitter<any>();

  searchValue: any;
  basePath;
  flagLogin = false;  // 登录框是否显示
  isVisibleUpdate = false; // 修改密码
  isVisibleLogin = false; // 登录
  isVisiblePersonInfo = false; // 个人信息
  isVisibleImg = false; // 更换头像
  oldPassword;
  newPassword;
  repeatPassword;
  sendData;
  account;
  password;
  loginFlag; // 判断用户是否登录
  userNickName;
  userSignature;
  userHeadImg;
  userID;
  promptFlag = false; // 密码
  questionImg;
  userHeadImgFlag = true;
  img;
  avatarUrl: string;
  loading = false;
  userName;
  userdepartment;
  userMajor;
  userPhone;
  constructor(private httpClient: HttpClient, private appService: AppService, private route: Router, private sanitizer: DomSanitizer,
    private message: NzMessageService) {
    this.basePath = this.appService.getBasePath();
  }

  ngOnInit() {
    this.loginFlag = localStorage.getItem('loginFlag');
    this.userID = localStorage.getItem('userID');
    if (this.loginFlag !== 'true') {
      this.flagLogin = false;
    } else {
      this.flagLogin = true;
    }

    // 获取当前登录用户信息
    if (this.userID) {
      this.sendData = { 'content': this.userID };
      const userIDParams = new HttpParams().set('data', JSON.stringify(this.sendData));
      this.httpClient.post(this.basePath + '/user/selectUser', userIDParams).subscribe(data => {
        if (data['status'] === '200') {
          this.userNickName = data['users']['nickname'];
          this.userSignature = data['users']['autograph'];
          this.userName = data['users']['userName'];
          this.userdepartment = data['users']['userDepartment'];
          this.userMajor = data['users']['userMajor'];
          this.userPhone = data['users']['userPhone'];
          this.userHeadImg = data['users']['headImg'];
        }
      }, error => {
        console.log('error');
      });
    }


  }

  beforeUpload = (file: File) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJPG = file.type === 'image/jpeg';
      if (!isJPG) {
        this.message.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.message.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      // check height
      this.checkImageDimension(file).then(dimensionRes => {
        if (!dimensionRes) {
          this.message.error('Image only 30x30 above');
          observer.complete();
          return;
        }

        observer.next(isJPG && isLt2M && dimensionRes);
        observer.complete();
      });
    });
  }

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  private checkImageDimension(file: File): Promise<boolean> {
    return new Promise(resolve => {
      const img = new Image(); // create image
      img.src = window.URL.createObjectURL(file);
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        window.URL.revokeObjectURL(img.src!);
        resolve(height >= 30 && width >= 30);
      };
    });
  }

  handleChange(info: { file: UploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (thumbUrl: string) => {
          this.loading = false;
          this.avatarUrl = thumbUrl;
        });
        break;
      case 'error':
        this.getBase64(info.file!.originFileObj!, (thumbUrl: string) => {
          this.loading = false;
          this.avatarUrl = thumbUrl;
        });
        break;
    }
  }

  // 搜索
  getSearchInfo() {
    this.getSearchValue.emit(this.searchValue);
  }

  // 查看头像
  viewImg() { this.isVisibleImg = true; }
  ImgCancel() { this.isVisibleImg = false; }
  // 更新头像
  ImgOk() {
    this.sendData = {
        'HeadImg': this.avatarUrl,
        'userId': this.userID,
    };

    const Params = new HttpParams().set('data', JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath + '/user/updateUser ', Params).subscribe(data => {
      if (data != null && data !== '') {
            this.message.success(data['msg']);
      }
    }, error => {
      console.log('error');
    });
    this.isVisibleImg = false;
  }


  // 个人信息
  updatePersonInfo() { this.isVisiblePersonInfo = true; }
  personInfoCancel() { this.isVisiblePersonInfo = false; }
  personInfoOk() {
    if (this.userNickName !== '' && this.userNickName != null && this.userSignature !== '' && this.userSignature !== null) {
      this.sendData = {
        'userId': this.userID,
        'nickName': this.userNickName,
        'antugraph': this.userSignature,
        'userDepartment': this.userdepartment,
        'userMajor': this.userMajor
      };
      const Params = new HttpParams().set('data', JSON.stringify(this.sendData));
      this.httpClient.post(this.basePath + '/user/updateUser', Params).subscribe(data => {
        if (data['status'] === '200') {
          this.appService.info(data['msg']);
          this.isVisiblePersonInfo = false;
          location.reload(true);
        } else {
          this.appService.info(data['msg']);
        }
      }, error => {
        console.log('error');
      });
    }

  }

  //修改密码
  updatePass() { this.isVisibleUpdate = true; }
  updateCancel() { this.isVisibleUpdate = false; }
  updateOk() {
    if (this.newPassword === this.repeatPassword) {
      this.sendData = {
        'oldpass': this.oldPassword,
        'newpass': this.newPassword,
        'userId': this.userID
      };
      const Params = new HttpParams().set('data', JSON.stringify(this.sendData));
      this.httpClient.post(this.basePath + '/user/updatePass', Params).subscribe(data => {
        if (data['status'] === '200') {
          this.appService.info(data['msg']);
          this.isVisibleUpdate = false;
          this.oldPassword = '';
          this.newPassword = '';
          this.repeatPassword = '';
        } else {
          this.appService.info(data['msg']);
        }
      }, error => {
        console.log('error');
      });
    } else {
      this.promptFlag = true;
    }

  }

  // 用户登录
  loginPerson() { this.isVisibleLogin = true; }
  loginCancel() { this.isVisibleLogin = false; }
  loginOk() {
    if (this.account !== '' && this.account != null && this.password != null && this.password !== '') {
      this.sendData = {
        'userId': this.account,
        'password':  this.password
      };
      const Params = new HttpParams().set('data', JSON.stringify(this.sendData));
      this.httpClient.post(this.basePath + '/user/userLogin', Params).subscribe(data => {
        if (data['status'] === '200') {
          this.flagLogin = true;
          this.isVisibleLogin = false;
          localStorage.setItem('loginFlag', 'true');
          localStorage.setItem('userID', data['admin']['userId']);
          location.reload(true);
        } else {
          this.message.error(data['msg']);
        }
      }, error => {
        console.log('error');
      });
    } else {
      this.appService.info('账号密码为必填字段');
    }
  }

  // 退出系统
  dropSystem() {
    const locations = window.location.href;
    localStorage.setItem('loginFlag', '');
    localStorage.setItem('userID', '');
    if (locations === 'http://localhost:4200/home') {
      location.reload(true);
    } else {
      this.route.navigate(['/home']);
    }
    this.flagLogin = false;
  }

}

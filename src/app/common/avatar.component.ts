import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient, HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html'
})
export class AvatarComponent implements OnInit {
  basePath;
  sendData;
  isVisibleFan = false;
  isVisibleAttend = false;
  isVisiblePost = false;
  userID;

  constructor(private appService: AppService, private httpClient: HttpClient) {
    this.basePath = this.appService.getBasePath();
  }

  ngOnInit() {
    this.userID = localStorage.getItem("userID");
    this.sendData = {"content": this.userID};
    const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath + '/user/selectUser', Params).subscribe(data => {
      if (data != null && data != '') {
        if (data['status'] == 200) {

        }
      }
    }, error => {
      console.log("errror");
    });
    
  }

  //打开
  openPost() { this.isVisiblePost = true; }
  openAttend() { this.isVisibleAttend = true; }
  openFan() { this.isVisibleFan = true; }
  //取消
  cancelPost() { this.isVisiblePost = false; }
  cancelAttend() { this.isVisibleAttend = false; }
  cancelFan() { this.isVisibleFan = false; }

}

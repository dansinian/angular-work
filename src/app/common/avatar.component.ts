import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html'
})
export class AvatarComponent implements OnInit {
  isVisibleFan = false;
  isVisibleAttend = false;
  isVisiblePost = false;

  constructor() { }

  ngOnInit() {
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

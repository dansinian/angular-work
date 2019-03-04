import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  hideNavigation = true;
  isVisible = false;
  oldPassword;
  newPassword;
  repeatPassword;


  constructor(private route: Router) { }

  ngOnInit() {
  }

  //点击隐藏导航
  hideNav() {
    if (this.hideNavigation) {
      $(".admin-nav").hide();
      this.hideNavigation = false;
    } else {
      $(".admin-nav").show();
      this.hideNavigation = true;
    }
  }

  //显示
  showModel() {
    this.isVisible = true;
  }
  //退出系统
  drop() {
    this.route.navigate(['/admin']);
  }

  //修改密码
  updatePass() { this.isVisible = false; }

  handleCancel() { this.isVisible = false; }
  
}

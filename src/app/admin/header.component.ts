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

  //������ص���
  hideNav() {
    if (this.hideNavigation) {
      $(".admin-nav").hide();
      this.hideNavigation = false;
    } else {
      $(".admin-nav").show();
      this.hideNavigation = true;
    }
  }

  //��ʾ
  showModel() {
    this.isVisible = true;
  }
  //�˳�ϵͳ
  drop() {
    this.route.navigate(['/admin']);
  }

  //�޸�����
  updatePass() { this.isVisible = false; }

  handleCancel() { this.isVisible = false; }
  
}

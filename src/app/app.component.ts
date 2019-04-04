import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/entity/user';

declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  name;
  id;
  type;
  headerDivFlag = true;
  userFlag;
  constructor(private route: Router) { }

  ngOnInit() {
    this.type = localStorage.getItem("type");
    this.name = localStorage.getItem("name");
    this.id = localStorage.getItem("id");
    this.userFlag = localStorage.getItem("userFlag");
    if (this.userFlag) {
      this.headerDivFlag = false;
    }
    if (window.location.href.indexOf('admin') >= 0) {
      this.headerDivFlag = true;
    }
  }

  drop() {
    localStorage.setItem("userFlag", "");
    this.route.navigate(['/login'],{});
    this.headerDivFlag = true;
  }

  //Â·ÓÉÌø×ª
  getRouter(action) {
    this.route.navigate(['/'+action], {});
  }

}

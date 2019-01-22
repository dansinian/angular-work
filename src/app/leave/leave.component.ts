import { Component, OnInit } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html'
})
export class LeaveComponent implements OnInit {
  user;

  constructor() { }

  ngOnInit() {
    this.user = localStorage.getItem("user");
    $(".attendance-nav ul li").removeClass('active');
    $(".attendance-nav ul li").eq(1).addClass('active');
  }

}

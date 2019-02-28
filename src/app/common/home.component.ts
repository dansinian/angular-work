import { Component, OnInit } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(".header-left li").removeClass();//active
    $(".header-left li").eq(0).addClass('active');
  }

}

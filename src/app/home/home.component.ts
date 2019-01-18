import { Component, OnInit } from '@angular/core';
import { EcharService } from '../common/echar.service';


declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  list;
  user;
  constructor(private echart: EcharService) { }

  ngOnInit() {
    this.user = localStorage.getItem('user');
    this.list = ['һ', '��', '��' ,'��' ,'��' ,'��', '��', '��', '��', 'ʮ', 'ʮһ', 'ʮ��', 'ʮ��', 'ʮ��', 'ʮ��', 'ʮ��']

    //this.echart.getMonth('lineChart');

    $(".attendance-nav ul li").removeClass('active');
    $(".attendance-nav ul li").eq(0).addClass('active');

  }

}

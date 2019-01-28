import { Component, OnInit } from '@angular/core';
import { EcharService } from '../common/echar.service';
import { ActivatedRoute } from '@angular/router';


declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  list;
  user;
  constructor(private echart: EcharService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.user = localStorage.getItem('user');
    this.list = ['一', '二', '三' ,'四' ,'五' ,'六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六']

    //this.echart.getMonth('lineChart');

    $(".attendance-nav ul li").removeClass('active');
    $(".attendance-nav ul li").eq(0).addClass('active');

    // this.activatedRoute.queryParams.subscribe(params => {
    //   const appName = params['appName'];
     
    // });

  }

}

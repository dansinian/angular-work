import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  user;

  constructor(private route: Router) { }

  ngOnInit() {
    this.user = localStorage.getItem("user");

    // $(".attendance-nav ul li").on('click', function() {
    //     $(".attendance-nav ul li").removeClass('active');
    //     $(this).addClass('active');
    //     console.log(111);
    // });
  }

  drop() {
    this.route.navigate(['/login'],{});
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  name;
  id;
  type;

  constructor(private route: Router) { }

  ngOnInit() {
    this.type = localStorage.getItem("type");
    this.name = localStorage.getItem("name");
    this.id = localStorage.getItem("id");
    // console.log($(".header ul"));
  }

  drop() {
    localStorage.setItem("userFlag", "");
    this.route.navigate(['/login'],{});
  }

}

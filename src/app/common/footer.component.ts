import { Component, OnInit } from '@angular/core';


declare var $: any;
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  constructor() { }
  

  ngOnInit() {
    
  }

  scoll() {
    window.scroll(0, 0);
  }

}

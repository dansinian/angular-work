import { Component, OnInit } from '@angular/core';
import { EcharService } from '../common/echar.service';


declare var $: any;
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {
  user;

  constructor(private echartService: EcharService) { }

  ngOnInit() { 
    this.user = localStorage.getItem("user");
      $("#info-jk-tab li").on('click', function() {
          $("#info-jk-tab li").removeClass('active');
          $(this).addClass('active');
          let aid = $(this).attr('aid');
          $(".infojk").addClass('hide');
          $("#person"+aid).removeClass("hide");
      });

      this.echartService.getAxis("infojk-result");
  }

}

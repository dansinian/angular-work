import { Component, OnInit } from '@angular/core';
import { EcharService } from '../common/echar.service';


declare var $: any;
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private echartService: EcharService) { }

  ngOnInit() { 
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

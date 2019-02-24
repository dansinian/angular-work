import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';

declare var $: any;

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html'
})
export class ErrorComponent implements OnInit {
    constructor(private route: ActivatedRoute, private titleService: Title) {
    }

    msg: string;
    title: string;

    ngOnInit(): void {
      //  $('#loadingPage').css('display', 'none');
        this.route.queryParams.subscribe(params => {
            this.msg = params['msg'];
            this.title = params['title'];
            // 通过这种形式来接收父级页面传过来的值
        });
        this.titleService.setTitle('提示');
    }
}

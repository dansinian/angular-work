import { Component, OnInit } from '@angular/core';
import { Reply } from '../entity/reply';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html'
})
export class ReplyComponent implements OnInit {
  reply: Reply;
  basePath;

  constructor(private appService: AppService, private httpClient: HttpClient) {
    this.basePath = this.appService.getBasePath();
    this.reply = {id:'', commentID:'', userID:'', content:'', prase:'', time:'', commentUserID:''};
  }

  ngOnInit() {
  }

}

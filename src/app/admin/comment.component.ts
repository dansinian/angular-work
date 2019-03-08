import { Component, OnInit } from '@angular/core';
import { Comment } from '../entity/comment';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html'
})
export class CommentComponent implements OnInit {
  basePath;
  comment: Comment;

  constructor(private appService: AppService, private httpClient: HttpClient) {
    this.basePath = this.appService.getBasePath();
    this.comment = {id:'', queID:'', userID:'', content:'', prase:'', time:'', img:''};
  }

  ngOnInit() {
  }

}

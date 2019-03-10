import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html'
})
export class QuestionPageComponent implements OnInit {
  commentPartFlag = false; //控制评论框是否出现
  commentConent; //评论回复对象

  constructor() { }

  ngOnInit() {
  }

  //显示评论框
  showCommentReply(item) {
    if (item == 1) {
      this.commentConent = "楼主";
      this.commentPartFlag = true;
    } else {
      this.commentConent = "其他人";
      this.commentPartFlag = true;
    }
  }

  //发表评论之后隐藏评论框
  commentPublish() {
    this.commentPartFlag = false;
  }

}

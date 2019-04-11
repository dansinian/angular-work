import { Component, OnInit } from '@angular/core';
import { Comment } from '../entity/comment';
import { AppService } from '../app.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html'
})
export class CommentComponent implements OnInit {
  basePath;
  comment: Comment;
  nzNoResult = "正在加载。。。";
  pageLoading = true;
  sendData;
  infoList;
  searchValue;
  isVisibleUpdate = false;

  constructor(private appService: AppService, private httpClient: HttpClient, private route: Router) {
    this.basePath = this.appService.getBasePath();
    this.comment = {id:'', queID:'', userID:'', content:'', prase:'', time:'', img:''};
  }

  ngOnInit() {
    if (!localStorage.getItem("userFlag")) {
      this.route.navigate(['/admin/login']);
      return;
    }
    //active
    $(".navigation li").removeClass();
    $(".navigation li").eq(4).addClass("active");
    const Params = new HttpParams().set("data", "");
    this.httpClient.post(this.basePath + '/comment/selectComment', Params).subscribe(data => {
      if (data != null && data != '') {
        console.log(data);
        if (data['status'] == '200') {
          this.infoList = data['comments'];
          this.pageLoading = false;
        }
      }
    }, error => {
      console.log("error");
    });
  }

  //搜索
  getSearch() {
    this.pageLoading = true;
    this.sendData = { "content": this.searchValue };
    const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath + '/comment/selectCommentByContent', Params).subscribe(data => {
      if (data != null && data != '') {
        this.infoList = [];
        console.log(data);
        if (data['status'] == '200') {
          this.infoList = data['comment'];
          console.log(this.infoList);
          this.pageLoading = false;
        }
      }
    }, error => {
      console.log("error");
    });
  }

  //编辑
  // updateInfo(item) {
  //   this.comment.id = item.commentId;
  //   this.comment.queID = item.queId;
  //   this.comment.userID = item.userId;
  //   this.comment.content = item.content;
  //   this.isVisibleUpdate = true;
  // }

  // handleCancel() { this.isVisibleUpdate = false; }
  // handleUpdate() {
  //   this.sendData = { }
  // }

  //删除
  deteleInfo(item) {
    this.sendData ={ "commentId": item.commentId };
    const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath + '/comment/deleteComment', Params).subscribe(data => {
      if (data != null && data != '') {
        if (data['status'] == '200') {
          this.appService.info(data['msg']);
          location.reload(true);
        } else {
          this.appService.info(data['msg']);
        }
      }
    }, error => {
      console.log("error");
    });
  }

}

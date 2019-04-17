import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { AppService } from '../app.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UploadFile } from 'ng-zorro-antd';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

declare var $: any;
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit {
  basePath;
  uploader;
  queTitle;
  queContent;
  queImg;
  sendData;
  fileList: UploadFile[] = [];
  questionImg;

  constructor(private appService: AppService, private httpClient: HttpClient, private route: Router, private sanitizer: DomSanitizer) {
    this.basePath = this.appService.getBasePath();
  }

  ngOnInit() {
    if (!localStorage.getItem("userFlag")) {
      this.route.navigate(['/admin/login']);
      return;
    }
  }

  //选择上传文件
  fileChange(event){
    let file = event.target.files[0];
    let imgUrl = window.URL.createObjectURL(file);
    let sanitizerUrl = this.sanitizer.bypassSecurityTrustUrl(imgUrl);
    this.questionImg = sanitizerUrl;
  }

  //发布帖子
  publishQue() {
    this.sendData = {
      "title": this.queTitle,
      "detail": this.queContent,
      "userId": localStorage.getItem('id'),
      "queImg": this.questionImg
    }
    const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath +'/question/createQuestion', Params).subscribe(data => {
      if (data != null && data != '') {
        if (data['status'] == '200') {
          this.appService.info(data['msg']);
          this.route.navigate(['/admin/questionPage'], {queryParams: {'id': data['question']['queId']} });
        } else {
          this.appService.info(data['msg']);
        }
      }
    }, error => {
      console.log("error");
    });
  }

}

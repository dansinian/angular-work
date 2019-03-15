import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { AppService } from '../app.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UploadFile } from 'ng-zorro-antd';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';

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

  constructor(private appService: AppService, private httpClient: HttpClient, private route: Router) {
    this.basePath = this.appService.getBasePath();
  }

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  }

  ngOnInit() {
    this.uploader  = new FileUploader({
      url: this.basePath + '/ticket/uploadmedioFile?appName=',
      method: 'POST',
      itemAlias: 'medioFile'
  });

  }

  //选择上传文件
  selectedFileOnChanged(event: any) {
    console.log(event);
  }

  //发布帖子
  publishQue() {
    const formData = new FormData();
    this.fileList.forEach((file: any) => {
      console.log(file);
      formData.append('files[]', file);
    });
    this.sendData = {
      "title": this.queTitle,
      "detail": this.queContent,
      "userId": localStorage.getItem('id'),
      "queImg": formData
    }
    console.log(this.sendData);
    const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath +'/question/createQuestion', Params).subscribe(data => {
      console.log(data);
      if (data != null && data != '') {
        if (data['status'] == '200') {
          this.appService.info(data['msg']);
          this.route.navigate(['/admin/questionPage'], {queryParams: {'id':""} });
        } else {
          this.appService.info(data['msg']);
        }
      }
    }, error => {
      console.log("error");
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { AppService } from '../app.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit {
  basePath;
  upLoad;

  constructor(private appService: AppService) {
    this.basePath = this.appService.getBasePath();
  }

  ngOnInit() {
    //定义上传文件
    this.upLoad: FileUploader  = new FileUploader({
      url: this.basePath + "/images/upload", //上传地址
      method: "POST",  //上传方式
      itemAlias: "imageFile",  //别名（后台接受参数名）
      autoUpload: false  //是否自动上传（如果为true，则在input选择完后自动上传）
    });
  }

}

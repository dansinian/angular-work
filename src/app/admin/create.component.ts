import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { AppService } from '../app.service';
import {HttpClient, HttpEventType, HttpHeaders, HttpParams, HttpRequest, HttpResponse} from '@angular/common/http';
import {NzMessageService, UploadFile} from 'ng-zorro-antd';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import {RequestOptions} from '@angular/http';
import {Observable, Observer} from 'rxjs';

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
  loading = false;
  avatarUrl: string;

  constructor(private appService: AppService, private httpClient: HttpClient, private route: Router, private sanitizer: DomSanitizer,
                private msg: NzMessageService) {
    this.basePath = this.appService.getBasePath();
  }



  ngOnInit() {
    if (!localStorage.getItem('userFlag')) {
      this.route.navigate(['/admin/login']);
      return;
    }
  }

  beforeUpload = (file: File) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJPG = file.type === 'image/jpeg';
      if (!isJPG) {
        this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      // check height
      this.checkImageDimension(file).then(dimensionRes => {
        if (!dimensionRes) {
          this.msg.error('Image only 30x30 above');
          observer.complete();
          return;
        }

        observer.next(isJPG && isLt2M && dimensionRes);
        observer.complete();
      });
    });
  }

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  private checkImageDimension(file: File): Promise<boolean> {
    return new Promise(resolve => {
      const img = new Image(); // create image
      img.src = window.URL.createObjectURL(file);
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        window.URL.revokeObjectURL(img.src!);
        resolve(width >= 30 && width >= 30);
      };
    });
  }

  handleChange(info: { file: UploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (thumbUrl: string) => {
          this.loading = false;
          this.avatarUrl = thumbUrl;
        });
        break;
      case 'error':
        this.getBase64(info.file!.originFileObj!, (thumbUrl: string) => {
          this.loading = false;
          this.avatarUrl = thumbUrl;
        });
        break;
    }
  }

  // 发布帖子
  publishQue() {
    this.sendData = {
      'title': this.queTitle,
      'detail': this.queContent,
      'userId': localStorage.getItem('id'),
      'queImg': this.avatarUrl
    };
    const Params = new HttpParams().set('data', JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath + '/question/createQuestion', Params).subscribe(data => {
      if (data != null && data !== '') {
        if (data['status'] === '200') {
          this.appService.info(data['msg']);
          this.route.navigate(['/admin/questionPage'], {queryParams: {'id': data['question']['queId']} });
        } else {
          this.appService.info(data['msg']);
        }
      }
    }, error => {
      console.log('error');
    });
  }

}

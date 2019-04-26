import { Component, OnInit } from '@angular/core';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { filter } from 'rxjs/operators';
import { HttpClient, HttpRequest, HttpResponse, HttpParams } from '@angular/common/http';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { DomSanitizer } from '@angular/platform-browser';
import {Observable, Observer} from 'rxjs';

declare var Base64: any;
declare var $: any;
@Component({
  selector: 'app-post-datil',
  templateUrl: './post-datil.component.html'
})
export class PostDatilComponent implements OnInit {
  basePath;
  uploading = false;
  fileList: UploadFile[] = [];
  sendData;
  questionCourse; // 课程
  questionText; // 文本
  questionTitle; // 标题
  questionImg; // 图片
  userID;
  courseList = [];
  department;
  major;
  loading = false;
  avatarUrl: string;

  constructor(private appService: AppService , private httpClient: HttpClient, private messageService: NzMessageService,
    private route: Router, private activatedRoute: ActivatedRoute,  private sanitizer: DomSanitizer) {
    this.basePath = this.appService.getBasePath();
  }
  // const Params = new HttpParams().set('data', Base64.encode(JSON.stringify(dataParams)))

  ngOnInit() {
    $('.header-left li').removeClass(); // active
    $('.header-left li').eq(2).addClass('active');
    this.userID = localStorage.getItem('userID');
    this.httpClient.get(this.basePath + '/course/getCourse').subscribe(data => {
      if (data != null && data !== '') {
        if (data['status'] === '200') {
          const course = data['AllCourse'];
          for (const item of course) {
            this.courseList.push({
              'value': item['course']
            });
          }
        }
      }
    }, error => {
      console.log('error');
    });

  }

  beforeUpload = (file: File) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJPG = file.type === 'image/jpeg';
      if (!isJPG) {
        this.messageService.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.messageService.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      // check height
      this.checkImageDimension(file).then(dimensionRes => {
        if (!dimensionRes) {
          this.messageService.error('Image only 300x300 above');
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
    console.log(info);
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


  // 发表帖子
  createQuestion() {
    this.sendData = {
      'userId': this.userID,
      'title': this.questionTitle,
      'detail': this.questionText,
      'queCourse': this.questionCourse,
      'queImg': this.avatarUrl
    };
    const Params = new HttpParams().set('data', JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath + '/question/createQuestion', Params).subscribe(data => {
      if (data != null && data !== '') {
        if (data['status'] === '200') {
          const question = data['question'];
          this.route.navigate(['/questionContent'], {queryParams: {'questionId' : question.queId, 'userID': question.userId}});
        }
      }
    }, error => {
      console.log('发帖失败！');
    });

  }

  getNavValue(event) {
    console.log(event);
    const arr = event.split(',');
    this.department = arr[0],
    this.major = arr[1];
    this.route.navigate(['/home'], {queryParams: {'department' : this.department, 'major': this.major}});
  }

}

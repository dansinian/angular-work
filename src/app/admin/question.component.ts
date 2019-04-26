import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Question } from '../entity/question';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import {NzMessageService, UploadFile} from 'ng-zorro-antd';
import {Observable, Observer} from 'rxjs';

declare var $: any;
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html'
})
export class QuestionComponent implements OnInit {
  basePath;
  question: Question;
  searchValue;
  sendData;
  isVisibleUpdate = false; // 修改Model
  infoList = [];
  nzNoResult = '正在加载。。。';
  pageLoading = true;
  avatarUrl: string;
  loading = false;

	constructor(private appService: AppService, private httpClient: HttpClient, private route: Router, private sanitizer: DomSanitizer,
              private message: NzMessageService,) {
		this.basePath = this.appService.getBasePath();
		this.question = { id: '', title: '', detail: '', userID: '', time: '', click: '', praise: '', reply: '', course: '', unread: '', src: '' };
	}

  ngOnInit() {
    if (!localStorage.getItem('userFlag')) {
      this.route.navigate(['/admin/login']);
      return;
    }
    //active
    $('.navigation li').removeClass();
    $('.navigation li').eq(3).addClass('active');
    const Params = new HttpParams().set('data', '');
    this.httpClient.post(this.basePath + '/question/selectQuestion', Params).subscribe(data => {
      if (data != null && data !== '') {
        if (data['status'] === '200') {
          this.infoList = data['questions'];
          console.log(this.infoList);
          this.pageLoading = false;
        }else {
            this.infoList = [];
            this.pageLoading = false;
          }
        }
    },error => {
      console.log('error');
    });
  }

  beforeUpload = (file: File) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJPG = file.type === 'image/jpeg';
      if (!isJPG) {
        this.message.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.message.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      // check height
      this.checkImageDimension(file).then(dimensionRes => {
        if (!dimensionRes) {
          this.message.error('Image only 30x30 above');
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
          this.question.src = thumbUrl;
        });
        break;
      case 'error':
        this.getBase64(info.file!.originFileObj!, (thumbUrl: string) => {
          this.loading = false;
          this.avatarUrl = thumbUrl;
          this.question.src = thumbUrl;
        });
        break;
    }
  }

  //搜索信息
  getSearchInfo() {
    this.pageLoading = true;
    if (this.searchValue !== null && this.searchValue !== ' ' && this.searchValue !== undefined) {
      this.sendData = { 'content': this.searchValue };
      const Params = new HttpParams().set('data', JSON.stringify(this.sendData));
      this.httpClient.post(this.basePath + '/question/selectQuestion', Params).subscribe(data => {
        if (data != null && data != '') {
          this.infoList = [];
          if (data['status'] == '200') {
            this.infoList = data['questions'];
            this.pageLoading = false;
          } else {
            this.infoList = [];
            this.pageLoading = false;
          }
        }
      }, error => {
        console.log('error');
      });
    } else {
      const Params = new HttpParams().set('data', '');
      this.httpClient.post(this.basePath + '/question/selectQuestion', Params).subscribe(data => {
        if (data != null && data != '') {
          if (data['status'] == '200') {
            this.infoList = data['questions'];
            this.pageLoading = false;
          } else {
            this.infoList = [];
            this.pageLoading = false;
          }
        }
      }, error => {
        console.log('error');
      });
    }
  }

  //修改信息
  updateInfo(item) {
    this.question.id = item.queId;
    this.question.title = item.queTitle;
    this.question.detail = item.queDetail;
    this.question.userID = item.userId;
    this.question.course = item.queCourse;
    this.question.src = item.queImg;
    this.isVisibleUpdate = true;
  }

  //保存修改信息
  handleUpdate() {
    this.sendData = {
      'questionId': this.question.id,
      'title': this.question.title,
      'detail': this.question.detail,
      'userId': this.question.userID,
      'queImg': this.question.src,
    };
    const Params = new HttpParams().set('data', JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath + '/question/updateQuestion', Params).subscribe(data => {
      if (data != null && data != '') {
        if (data['status'] == '200') {
          this.appService.info(data['msg']);
          this.isVisibleUpdate = false;
          location.reload(true);
        } else {
          this.appService.info(data['msg']);
        }
      }
    }, error => {
      console.log('error');
    });
  }

  //删除信息
  deteleInfo(item) {
    this.sendData = { 'questionId': item.queId };
    console.log(item.queId);
    const Params = new HttpParams().set('data', JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath + '/question/deleteQuestion', Params).subscribe(data => {
      if (data != null && data != '') {
        if (data['status'] == '200') {
          this.appService.info(data['msg']);
          location.reload(true);
        } else {
          this.appService.info(data['msg']);
        }
      }
    }, error => {
      console.log('error');
    });
  }

  //关闭Model
  handleCancel() {
    this.isVisibleUpdate = false;
  }

  Detail(item) {
	  console.log(item);
    this.route.navigate(['/admin/questionPage'], {queryParams: {'id': item.queId} });
  }
}

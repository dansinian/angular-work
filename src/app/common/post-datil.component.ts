import { Component, OnInit } from '@angular/core';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { filter } from 'rxjs/operators';
import { HttpClient, HttpRequest, HttpResponse, HttpParams } from '@angular/common/http';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { DomSanitizer } from '@angular/platform-browser';

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
  questionCourse; //课程
  questionText; //文本
  questionTitle; //标题
  questionImg; //图片
  userID;
  courseList = [];
  department;
  major;

  constructor(private appService: AppService ,private httpClient: HttpClient, private messageService: NzMessageService, 
    private route: Router, private activatedRoute: ActivatedRoute,  private sanitizer: DomSanitizer) {
    this.basePath = this.appService.getBasePath();
  }
  // const Params = new HttpParams().set('data', Base64.encode(JSON.stringify(dataParams)))

  ngOnInit() {
    $(".header-left li").removeClass();//active
    $(".header-left li").eq(2).addClass('active');
    this.userID = localStorage.getItem("userID");
    this.httpClient.get(this.basePath + '/course/getCourse').subscribe(data => {
      if (data != null && data != '') {
        if (data['status'] == '200') {
          let course = data['AllCourse'];
          for (let item of course) {
            this.courseList.push({
              "value": item['course']
            });
          }
        }
      }
    }, error => {
      console.log("error");
    });

  }

  //选择上传文件
  fileChange(event){
    let file = event.target.files[0];
    let imgUrl = window.URL.createObjectURL(file);
    let sanitizerUrl = this.sanitizer.bypassSecurityTrustUrl(imgUrl);
    this.questionImg = imgUrl;
  }

  //发表帖子
  createQuestion() {
    this.sendData = {
      "userId": this.userID,
      "title": this.questionTitle,
      "detail": this.questionText,
      "queCourse": this.questionCourse,
      "queImg": this.questionImg
    }
    const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath + '/question/createQuestion', Params).subscribe(data => {
      if (data != null && data != '') {
        if (data['status'] == '200') {
          let question = data['question'];
          this.route.navigate(['/questionContent'], {queryParams: {"questionId" : question.queId, "userID": question.userId}});
        }
      }
    }, error => {
      console.log("发帖失败！");
    });

  }


  publishPost(): void {
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    console.log(this.fileList);
    console.log(Base64.encode(JSON.stringify(this.fileList)));
    this.fileList.forEach((file: any) => {
      formData.append('files[]', file);
    });
    this.uploading = true;
    console.log(formData);
    this.httpClient.post(this.basePath + '/file/upload', Base64.encode(JSON.stringify(this.fileList))).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });

    // You can use any AJAX library you like
    const req = new HttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts/', formData, { });
    // this.httpClient.request(req).pipe(filter(e => e instanceof HttpResponse)).subscribe(
    //     () => {
    //       this.uploading = false;
    //       this.fileList = [];
    //       this.messageService.success('upload successfully.');
    //     },
    //     () => {
    //       this.uploading = false;
    //       this.messageService.error('upload failed.');
    //     }
    //   );
  }

  getNavValue(event) {
    console.log(event);
    let arr = event.split(',');
    this.department = arr[0],
    this.major = arr[1];
    this.route.navigate(['/home'], {queryParams: {"department" : this.department, "major": this.major}});
  }

}

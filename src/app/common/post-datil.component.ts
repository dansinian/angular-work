import { Component, OnInit } from '@angular/core';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { filter } from 'rxjs/operators';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { AppService } from '../app.service';

declare var Base64: any;
declare var $: any;
@Component({
  selector: 'app-post-datil',
  templateUrl: './post-datil.component.html'
})
export class PostDatilComponent implements OnInit {
  basePath;
  aa;
  uploading = false;
  fileList: UploadFile[] = [];

  constructor(private appService: AppService ,private httpClient: HttpClient, private messageService: NzMessageService) {
    this.basePath = this.appService.getBasePath();
  }
  // const Params = new HttpParams().set('data', Base64.encode(JSON.stringify(dataParams)))

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  }

  ngOnInit() {
    $(".header-left li").removeClass();//active
    $(".header-left li").eq(2).addClass('active');
  }

  //·¢±íÌû×Ó
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

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        let formData:FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        console.log(formData);
        //let options = new RequestOptions({ headers: headers });
        // this.http.post(`${this.apiEndPoint}`, formData, options).map(res => res.json()).catch(error => Observable.throw(error)).subscribe(
        //         data => console.log('success'),
        //         error => console.log(error)
        // )
    }
  }

}

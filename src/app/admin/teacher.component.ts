import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppService } from 'src/app/app.service';
import { User } from '../entity/user';

declare var $: any;
@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html'
})
export class TeacherComponent implements OnInit {
  isVisibleUpdate = false;
  isVisibleAdd = false;
  basePath;
  sendData;
  user: User;
  infoList = [];
  searchInfo;

  constructor(private modalService: NzModalService, private httpClient: HttpClient, private appService: AppService) {
    this.basePath = this.appService.getBasePath();
    this.user = {id: '', name: '', phone: '', major: '', department: '', password: '', nickname: '', img: '', autograph: '', type: ''};
  }

  ngOnInit() {
    $(".navigation li").removeClass();
    $(".navigation li").eq(1).addClass("active");

    this.sendData = {"type": "teacher"};
    const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath +'/user/selectAllUser', Params).subscribe(data => { 
      console.log(data);
      if (data != null && data != '') {
        if (data['status'] == '200') {
          console.log(data);
        }
      }
    }, error => {
      
    });
    
  }

  //显示添加学生Model
  addInfo() {
    this.isVisibleAdd = true;
  }

  //添加学生信息
  handleAdd() {
    this.sendData = {
      "userId": this.user.id,
      "userName": this.user.name,
      "userPhone": this.user.phone,
      "userPass": "123456",
      "userDepartment": this.user.department,
      "userMajor": this.user.major,
      "nickName": this.user.nickname,
      "antugraph": this.user.autograph,
      "HeadImg": this.user.img,
      "type": "teacher"
    }
    const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath+ '/user/createUser', Params).subscribe(data => {
      if (data != null && data != '') {
        if (data['status'] == '200') {
          this.appService.info("添加成功！");
          this.isVisibleAdd = false;
          location.reload(true);
        }
      }
    }, error => {
      this.appService.error("添加出错！");
    });
  }

  //显示修改Model
  updateInfo() {
    this.isVisibleUpdate = true;
  }

  //保存修改信息
  handleUpdate() {
    this.isVisibleUpdate = false;
  }

  //取消Model
  handleCancel() {
    this.isVisibleAdd = false;
    this.isVisibleUpdate = false;
  }

}

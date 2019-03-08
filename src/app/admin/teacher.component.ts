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
      if (data != null && data != '') {
        if (data['status'] == '200') {
          let list = data['Users'];
          for (let item of list) {
            this.infoList.push({
              "id": item['userId'],
              "name": item['userName'],
              "phone": item['userPhone'],
              "major": item['userMajor'],
              "department": item['userDepartment'],
              "nickname": item['nickname'],
              "img": item['headImg'],
              "autograph": item['autograph'],
            });
          }
        }
      }
    }, error => {
      console.log(error);
    });
    
  }

 //查询信息
 getSearchInfo() {
  if (this.searchInfo != null && this.searchInfo != ''){
    this.sendData = { "content": this.searchInfo, "type": "teacher" };
    const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath + '/user/selectUser', Params).subscribe(data => {
      if (data != '' && data != null) {
        this.infoList = [];
        if (data['status'] == '200') {
          let list = data['users'];
          for (let item of list) {
            this.infoList.push({
              "id": item['userId'],
              "name": item['userName'],
              "phone": item['userPhone'],
              "major": item['userMajor'],
              "department": item['userDepartment'],
              "nickname": item['nickname'],
              "img": item['headImg'],
              "autograph": item['autograph'],
            });
          }
        }
      }
    }, error => {
      console.log("error");
    });
  }
}

//显示添加老师Model
addInfo() {
  this.isVisibleAdd = true;
}

//添加老师信息
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
updateInfo(item) {
  this.user.id = item.id;
  this.user.name = item.name;
  this.user.phone = item.phone;
  this.user.major = item.major;
  this.user.department = item.department;
  this.isVisibleUpdate = true;
}

//删除信息
deteleInfo(item) {
  this.sendData = {"userId": item.id};
  const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
  this.httpClient.post(this.basePath +'/user/deleteUser', Params).subscribe(data => {
    if (data != null && data != '') {
      if (data['status'] == '200') {
        this.appService.info(data['msg']);
        location.reload(true);
      }
    }
  }, error => {
    this.appService.error("删除出错！");
  });
}

//保存修改信息
handleUpdate() {
  this.sendData = {
    "userId": this.user.id,
    "userName": this.user.name,
    "userPhone": this.user.phone,
    "userDepartment": this.user.department,
    "userMajor": this.user.major,
    "type": "teacher"
  };
  console.log(this.sendData);
  const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
  this.httpClient.post(this.basePath + '/user/updateUser', Params).subscribe(data => {
    console.log(data);
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
    this.appService.error("修改出错！");
  });
}

//取消Model
handleCancel() {
  this.isVisibleAdd = false;
  this.isVisibleUpdate = false;
}

}

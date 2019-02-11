import { Component, OnInit } from '@angular/core';
import { EcharService } from '../common/echar.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppService } from 'src/app/app.service';
import { Student } from '../entity/student';
import { Teacher } from '../entity/teacher';


declare var $: any;
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {
  student: Student;
  teacher: Teacher;
  basePath;
  type;
  sendData;
  personInfo;
  teacherInfo;
  scheduleInfo = [];
  oldPassword;
  newPassword;
  repairePassword;

  constructor(private echartService: EcharService, private httpClient: HttpClient, private appService: AppService) {
    this.basePath = this.appService.getBasePath();
    this.student = {id: '', name: '', identity: '', password: '123456', phone: '', class: '', major: '', department: '', guideName: '', schedule: '', gender: '', flag: '1'};
    this.teacher = {id: '',name: '',password: '123456', flag: '', gender: '', department: '', phone: '', class: ''};
  }

  ngOnInit() { 
      this.type = localStorage.getItem("type");
      $("#info-jk-tab li").on('click', function() {
          $("#info-jk-tab li").removeClass('active');
          $(this).addClass('active');
          let aid = $(this).attr('aid');
          $(".infojk").addClass('hide');
          $("#person"+aid).removeClass("hide");
      });
      this.sendData = {"content": localStorage.getItem("id")};
      const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
      if (this.type == 'student') {
        this.httpClient.post(this.basePath +'/student/selectStudent', Params).subscribe(data => {
          if (data != null && data != '') {
            if (data['status'] == '200') {
              let personInfo  = data['students'][0];
              this.student.id = personInfo['stuId'];
              this.student.name = personInfo['stuName'];
              this.student.gender = personInfo['stuGender'];
              this.student.class = personInfo['stuClass'];
              this.student.major = personInfo['stuMajor'];
              this.student.department = personInfo['stuDepartment'];
              this.student.identity = personInfo['stuIdentity'];
              this.student.phone = personInfo['stuPhone'];
              this.student.guideName = personInfo['teaName'];
              let schedule = personInfo['schedule'];
              schedule = schedule.replace("£¬",",");
              let arr = schedule.split(",");
              for (let item of arr) {
                this.scheduleInfo.push({
                  "value": item
                });
              }
            } else {
              this.appService.info(data['msg']);
            }
          }
        }, error => {

        });
      } else {
        this.httpClient.post(this.basePath +'/teacher/selectTeacher', Params).subscribe(data => {
          if (data != null && data != '') {
            if (data['status'] == '200') {
              let teacherInfo  = data['teacher'][0];
              this.teacher.id = teacherInfo['teaId'];
              this.teacher.name = teacherInfo['teaName'];
              this.teacher.gender = teacherInfo['teaGender'];
              this.teacher.phone = teacherInfo['teaPhone'];
              this.teacher.class = teacherInfo['teaClass'];
              this.teacher.department = teacherInfo['teaDepartment'];
              this.teacher.flag = teacherInfo['teaFlag'];
            } else {
              this.appService.info(data['msg']);
            }
          }
        }, error => {

        });
      }

      //this.echartService.getAxis("infojk-result");
  }

  //ÐÞ¸ÄÃÜÂë
  updatePassword() {
    this.sendData = {
      "id": localStorage.getItem("id"),
      "old": this.oldPassword,
      "new": this.newPassword,
    }

    if (this.type == 'student') {
      this.sendData.type = "student";

    } else {
      this.sendData.type = "teacher";
    }
    const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath +'/user/updatePass', Params).subscribe(data => {
      console.log(data);
      if (data != null && data != '') {
        if (data['status'] == '200') {
          this.appService.info(data['msg']);
        } else {
          this.appService.info(data['msg']);
        }
      }
    }, error => {
      this.appService.error("ÐÞ¸ÄÊ§°Ü£¡");
    });
  }

}

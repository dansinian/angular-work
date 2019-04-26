import { Component, OnInit } from '@angular/core';
import { Course } from '../entity/course';
import { AppService } from '../app.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html'
})
export class CourseComponent implements OnInit {
  basePath;
  course: Course;
  isVisibleAdd = false;
  isVisibleUpdate = false;
  sendData;
  infoList = [];
  searchValue;
  nzNoResult = '���ڼ��ء�����';
  pageLoading = true;

  constructor(private appService: AppService, private httpClient: HttpClient, private route: Router) {
    this.basePath = this.appService.getBasePath();
    this.course = {id: '', department: '', major: '', teacher: '', course: '', file: ''};
  }
  ngOnInit() {
    if (!localStorage.getItem('userFlag')) {
      this.route.navigate(['/admin/login']);
      return;
    }
    //active
    $('.navigation li').removeClass();
    $('.navigation li').eq(2).addClass('active');
    this.httpClient.get(this.basePath + '/course/getCourse').subscribe(data => {
      if (data !== null && data !== '') {
        if (data['status'] === '200') {
          this.infoList = data['AllCourse'];
          this.pageLoading = false;
        } else {
          console.log('error');
        }
      }
    }, error => {
      console.log('error');
    });

  }

  // ������Ϣ
  getSearchInfo() {
    this.pageLoading = true;
    if (this.searchValue !== ' ' && this.searchValue !== null && this.searchValue !== undefined) {
      this.sendData = {'content': this.searchValue};
      const Params = new HttpParams().set('data', JSON.stringify(this.sendData));
      this.httpClient.post(this.basePath + '/course/selectCourse', Params).subscribe(data => {
        if (data != null && data !== '') {
          if (data['status'] === '200') {
            this.infoList = data['course'];
            this.pageLoading = false;
          }
        }
      }, error => {
        console.log('error');
      });
    } else {
      this.httpClient.get(this.basePath + '/course/getCourse').subscribe(data => {
        if (data !== null && data !== '') {
          if (data['status'] === '200') {
            this.infoList = data['AllCourse'];
            this.pageLoading = false;
          } else {
            console.log('error');
          }
        }
      }, error => {
        console.log('error');
      });
    }

  }

  // �����Ϣ
  handleAdd() {
    this.sendData = {
      'department': this.course.department,
      'major': this.course.major,
      'course': this.course.course,
      'courseTeacher': this.course.teacher,
    };
    const Params = new HttpParams().set('data', JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath + '/course/createCourse', Params).subscribe(data => {
      if (data != null && data !== '') {
        if (data['status'] === '200') {
          this.appService.info('��ӳɹ���');
          location.reload(true);
          this.isVisibleAdd = false;
        } else {
          this.appService.info(data['msg']);
        }
      }
    }, error => {
      this.appService.error('��ӳ���');
      console.log('error');
    });
  }

  //ɾ����Ϣ
  deteleInfo(item) {
    this.sendData = {
      'couId': item.id,
      'department': item.department,
      'major': item.major,
      'course': item.course,
    };
    const Params = new HttpParams().set('data', JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath + '/course/deleteCourse', Params).subscribe(data => {
      if (data != null && data != '') {
        if (data['status'] == '200') {
          this.appService.info(data['msg']);
          location.reload(true);
        } else {
          this.appService.info(data['msg']);
        }
      }
    }, error => {
      this.appService.error('ɾ������');
      console.log('error');
    });
  }

  //�޸���Ϣ
  handleUpdate() {
    this.sendData = {
      'courseId': this.course.id,
      'department': this.course.department,
      'major': this.course.major,
      'course': this.course.course,
      'courseTeacher': this.course.teacher,
    };
    const Params = new HttpParams().set('data', JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath + '/course/updateCourse', Params).subscribe(data => {
      if (data != null && data != '') {
        if (data['status'] == '200') {
          this.appService.info(data['msg']);
          location.reload(true);
          this.isVisibleAdd = false;
        } else {
          this.appService.info(data['msg']);
        }
      }
    }, error => {
      this.appService.error('�޸ĳ���');
      console.log('error');
    });
  }

  // ��ʾModel
  addInfo() {
    this.isVisibleAdd = true;
  }
  // �޸�Model�� �����Ϣ
  updateInfo(item) {
    this.isVisibleUpdate = true;
    this.course.id = item.id;
    this.course.department = item.department;
    this.course.major = item.major;
    this.course.course = item.course;
    this.course.teacher = item.teacher;
  }
  // �ر�Model
  handleCancel() {
    this.isVisibleAdd = false;
    this.isVisibleUpdate = false;
  }


}

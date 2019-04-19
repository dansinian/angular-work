import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { NzModalService } from 'ng-zorro-antd';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Student } from '../entity/student';

declare var $: any;
@Component({
	selector: 'app-student',
	templateUrl: './student.component.html'
})
export class StudentComponent implements OnInit {
	isVisibleEdit = false;
	isVisibleAdd = false;
	basePath;
	infoList = [];
	student: Student;
	sendData;
	searchInfo;
	nzNoResult = "正在加载。。。";
	pageLoading = true;

	constructor(private appService: AppService, private modalService: NzModalService, private httpClient: HttpClient) {
		this.basePath = this.appService.getBasePath();
		this.student = { id: '', name: '', identity: '', password: '123456', phone: '', class: '', major: '', department: '', guideName: '', schedule: '', gender: '', flag: '1' };
	}

	ngOnInit() {
		$(".nav-list ul li").removeClass("active");
		$(".nav-list ul li").eq(0).addClass("active");
		const Params = new HttpParams().set("data", "");
		this.httpClient.post(this.basePath + '/student/selectStudent', Params).subscribe(data => {
			if (data['msg'] == '' && data['status'] == '200') {
				this.infoList = data['students'];
				this.pageLoading = false;
			} else {
				this.appService.info(data['msg']);
			}
		}, error => {
			this.appService.error("查询出错");
		})
	}

	getSearch() {
		this.sendData = { "content": this.searchInfo };
		const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
		this.httpClient.post(this.basePath + '/student/selectStudent', Params).subscribe(data => {
			if (data != null && data != '') {
				this.infoList = [];
				if (data['status'] == '200') {
					this.infoList = data['students'];
					this.pageLoading = false;
				} else {
					this.appService.info(data['msg']);
				}
			}
		}, error => {

		});
	}

	//编辑信息
	editInfo(item) {
		this.student.id = item.stuId;
		this.student.name = item.stuName;
		this.student.gender = item.stuGender;
		this.student.identity = item.stuIdentity;
		this.student.phone = item.stuPhone;
		this.student.class = item.stuClass;
		this.student.major = item.stuMajor;
		this.student.department = item.stuDepartment;
		this.student.guideName = item.teaName;
		this.student.password = item.stuPassword;
		this.student.flag = item.stuFlag;
		this.student.schedule = item.schedule;

		this.isVisibleEdit = true; //弹框显示
	}

	//添加信息
	addInfo() {
		this.isVisibleAdd = true;

	}

	//修改内容
	handleEdit() {
		this.sendData = {
			'studentId': this.student.id,
			'studentName': this.student.name,
			'studentGender': this.student.gender,
			'studentIdentity': this.student.identity,
			'studentPhone': this.student.phone,
			'studentClass': this.student.class,
			'studentMajor': this.student.major,
			'studentDepartment': this.student.department,
			'teacherName': this.student.guideName,
			'studentPassword': this.student.password,
			'studentFlag': this.student.flag,
			'schedule': this.student.schedule,
		};
		const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
		this.httpClient.post(this.basePath + '/student/updateStudent', Params).subscribe(data => {
			if (data != null || data != '') {
				if (data['status'] == '200') {
					this.appService.info(data['msg']);
					this.isVisibleEdit = false;
					location.reload(true);
				} else {
					this.appService.info(data['msg']);
				}
			}
		}, error => {
			this.appService.error("请检查代码！");
		});
	}

	//添加内容
	handleAdd() {
		this.sendData = {
			'studentId': this.student.id,
			'studentName': this.student.name,
			'studentGender': this.student.gender,
			'studentIdentity': this.student.identity,
			'studentPhone': this.student.phone,
			'studentClass': this.student.class,
			'studentMajor': this.student.major,
			'studentDepartment': this.student.department,
			'teacherName': this.student.guideName,
			'studentPassword': this.student.password,
			'studentFlag': this.student.flag,
			'schedule': this.student.schedule,
		};
		const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
		this.httpClient.post(this.basePath + '/student/createStudent', Params).subscribe(data => {
			if (data != null || data != '') {
				if (data['status'] == '200') {
					this.appService.info(data['msg']);
					this.isVisibleAdd = false;
					location.reload(true);
				} else {
					this.appService.info(data['msg']);
				}
			}
		}, error => {
			this.appService.error("请检查代码！");
		});

		this.student = { id: '', name: '', identity: '', password: '123456', phone: '', class: '', major: '', department: '', guideName: '', schedule: '', gender: '', flag: '1' };
	}

	//删除确认
	deleteConfirm(ID) {
		this.sendData = { "courseID": ID };
		const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
		this.modalService.confirm({
			nzTitle: '你确定删除此条信息？',
			nzOkText: '是',
			nzOkType: 'danger',
			nzOnOk: () => {
				this.httpClient.post(this.basePath + '/student/deleteStudent', Params).subscribe(data => {
					console.log(data);
					if (data != null && data != '') {
						if (data['status'] == '200') {
							this.appService.info(data['msg']);
							this.isVisibleAdd = false;
							location.reload(true);
						} else {
							this.appService.info(data['msg']);
						}
					}
				}, error => {
					this.appService.error("未删除！");
				});

			},
			nzCancelText: '取消',
			nzOnCancel: () => { }
		});
	}

	//取消模态框
	cancelEdit() { this.isVisibleEdit = false; }
	cancelAdd() { this.isVisibleAdd = false; }

}

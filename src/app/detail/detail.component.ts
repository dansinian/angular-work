import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Leave } from '../entity/leave';
import { User } from '../entity/user';
import { error } from '@angular/compiler/src/util';


declare var $: any;
@Component({
	selector: 'app-detail',
	templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {
	basePath;
	type;
	isVisibleUpdate = false; //ģ̬��
	isVisiblenotice = false; //ģ̬��
	leaveDetailInfo;
	sendData;
	leaveId;
	leave: Leave;
	startTime;
	endTime;
	infoList = [];

	constructor(private httpClient: HttpClient, private appService: AppService, private route: Router,
		private activatedRoute: ActivatedRoute) {
		this.basePath = this.appService.getBasePath();
		this.leave = { id: '', stuId: '', stuName: '', startTime: '', guideTea: '', applicationTime: '', endTime: '', day: '', courTea: '', status: '', reason: '' };
	}

	ngOnInit() {
		this.type = localStorage.getItem("type");
		$(".attendance-nav ul li").removeClass('active');
		$(".attendance-nav ul li").eq(2).addClass('active');
		this.activatedRoute.queryParams.subscribe(params => {
			this.leaveId = params['leaveID'];
		});

		if (this.type == 'student') {
			if (this.leaveId == null) {
				this.sendData = { "content": localStorage.getItem("name"), "type": "student" };
				const nameParams = new HttpParams().set("data", JSON.stringify(this.sendData));
				this.httpClient.post(this.basePath + '/leave/selectLeave', nameParams).subscribe(data => {
					if (data['status'] == '200') {
						let list = data['leaves'];
						for (let item of list) {
							this.infoList.push({
								"id": item.leaveId,
								"time": item.applicationTime,
								"day": item.leaveDay,
								"reason": item.leaveReason,
								"status": item.status
							});
						}
						let params = list[0];
						this.leave.id = params['leaveId'];
						this.leave.stuId = params['stuId'];
						this.leave.stuName = params['stuName'];
						this.leave.applicationTime = params['applicationTime'];
						this.leave.guideTea = params['approvalTea'];
						this.leave.endTime = params['endTime'];
						this.leave.startTime = params['startTime'];
						this.leave.day = params['leaveDay'];
						this.leave.status = params['status'];
						this.leave.courTea = params['leavecourseTea'];
						this.leave.reason = params['leaveReason'];
					}
				}, error => {
					this.appService.error("������");
				});
			} else {
				this.sendData = { "content": this.leaveId };
				const idParams = new HttpParams().set("data", JSON.stringify(this.sendData));
				this.httpClient.post(this.basePath + '/leave/selectLeave', idParams).subscribe(data => {
					if (data != null && data != '') {
						if (data['status'] == '200') {
							let params = data['leaves'][0];
							this.leave.id = params['leaveId'];
							this.leave.stuId = params['stuId'];
							this.leave.stuName = params['stuName'];
							this.leave.applicationTime = params['applicationTime'];
							this.leave.guideTea = params['approvalTea'];
							this.leave.endTime = params['endTime'];
							this.leave.startTime = params['startTime'];
							this.leave.day = params['leaveDay'];
							this.leave.status = params['status'];
							this.leave.courTea = params['leavecourseTea'];
							this.leave.reason = params['leaveReason'];
							this.sendData = { "content": this.leave.stuName, "type": "student" };
							const Params1 = new HttpParams().set("data", JSON.stringify(this.sendData));
							this.httpClient.post(this.basePath + '/leave/selectLeave', Params1).subscribe(data => {
								if (data != null && data != '') {
									if (data['status'] == '200') {
										let list = data['leaves'];
										for (let item of list) {
											this.infoList.push({
												"id": item.leaveId,
												"time": item.applicationTime,
												"day": item.leaveDay,
												"reason": item.leaveReason,
												"status": item.status
											});
										}
									}
								}
							}, error => {

							});

						} else {

						}
					}
				}, error => {
					//this.route.navigate(['/error']);
				});
			}
		}

		if (this.type == 'teacher') {
			let flag = localStorage.getItem("flag");
			if (flag == 'guide') {
				this.sendData = { "content": localStorage.getItem("name"), "type": "guide" };
			} else {
				this.sendData = { "content": localStorage.getItem("name"), "type": "teacher" };
			}
			console.log(this.sendData);
			const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
			this.httpClient.post(this.basePath + '/leave/selectLeave', Params).subscribe(data => {
				if (data != null && data != '') {
					if (data['status'] == '200') {
						let list = data['leaves'];
						for (let item of list) {
							this.infoList.push({
								"id": item.leaveId,
								"time": item.applicationTime,
								"day": item.leaveDay,
								"reason": item.leaveReason,
								"status": item.status
							});
						}
						let params = list[0];
						this.leave.id = params['leaveId'];
						this.leave.stuId = params['stuId'];
						this.leave.stuName = params['stuName'];
						this.leave.applicationTime = params['applicationTime'];
						this.leave.guideTea = params['approvalTea'];
						this.leave.endTime = params['endTime'];
						this.leave.startTime = params['startTime'];
						this.leave.day = params['leaveDay'];
						this.leave.status = params['status'];
						this.leave.courTea = params['leavecourseTea'];
						this.leave.reason = params['leaveReason'];
					}
				}
			}, error => {
				this.appService.error("������");
			});

		}

	}

	//�л��������Ϣ
	getLeaveInfo(ID) {
		this.sendData = { "content": ID };
		const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
		this.httpClient.post(this.basePath + '/leave/selectLeave', Params).subscribe(data => {
			if (data != null && data != '') {
				if (data['status'] == '200') {
					let params = data['leaves'][0];
					this.leave.id = params['leaveId'];
					this.leave.stuId = params['stuId'];
					this.leave.stuName = params['stuName'];
					this.leave.applicationTime = params['applicationTime'];
					this.leave.guideTea = params['approvalTea'];
					this.leave.endTime = params['endTime'];
					this.leave.startTime = params['startTime'];
					this.leave.day = params['leaveDay'];
					this.leave.status = params['status'];
					this.leave.courTea = params['leavecourseTea'];
					this.leave.reason = params['leaveReason'];
				}
			}
		}, error => {

		});
	}

	// ��׼�������
	agreeApply() {
		this.sendData = {
			"leaveId": this.leave.id,
			"StuId": this.leave.stuId,
			"StuName": this.leave.stuName,
			"endTime": this.leave.endTime,
			"startTime": this.leave.startTime,
			"applicationTime": this.leave.applicationTime,
			"leaveDay": this.leave.day,
			"approvalTea": this.leave.guideTea,
			"leaveCourseTea": this.leave.courTea,
			"reason": this.leave.reason,
			"status": "1",
			"type": "guide"
		};
		const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
		this.httpClient.post(this.basePath + '/leave/updateLeave', Params).subscribe(data => {
			console.log(data);
			if (data != null && data != '') {
				if (data['status'] == '200') {
					console.log(data['msg']);
					this.appService.info("��׼�ɹ���");
					location.reload(true);
				} else {
					this.appService.info(data['msg']);
				}
			}
		}, error => {

		});
	}

	//�޸������Ϣ����ѯ��
	updateApply() {
		console.log(this.leave.startTime, this.leave.endTime);
		this.startTime = this.leave.startTime;
		this.endTime = this.leave.endTime;
		this.isVisibleUpdate = true;
	}
	//ģ̬��ȡ����ȡ���޸ģ�
	handleCancel() {
		this.isVisibleUpdate = false;
	}
	//�����޸ĵ���Ϣ
	saveUpdateApply() {
		this.leave.applicationTime = this.appService.getDate(new Date());
		this.leave.startTime = this.appService.getDate(this.startTime);
		this.leave.endTime = this.appService.getDate(this.endTime);
		this.sendData = {
			"leaveId": this.leave.id,
			"StuId": this.leave.stuId,
			"StuName": this.leave.stuName,
			"endTime": this.leave.endTime,
			"startTime": this.leave.startTime,
			"applicationTime": this.leave.applicationTime,
			"leaveDay": this.leave.day,
			"approvalTea": this.leave.guideTea,
			"leaveCourseTea": this.leave.courTea,
			"reason": this.leave.reason,
			"type": "student"
		};
		const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
		this.httpClient.post(this.basePath + '/leave/updateLeave', Params).subscribe(data => {
			console.log(data);
			if (data != null && data != '') {
				if (data['status'] == '200') {
					this.appService.info(data['msg']);
					location.reload(true);
					this.isVisibleUpdate = false;
				} else {
					this.appService.info(data['msg']);
				}
			}
		}, error => {
			this.appService.error("�޸Ĳ��ɹ�");
		});
	}

	//֪ͨ��ʦ�����Ϣ
	noticeTeach(ID) {
		this.sendData = {
			"studentName": this.leave.stuName,
			"teacherName": this.leave.guideTea,
			"teacherPhone": localStorage.getItem("phone")
		}
		const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
		this.httpClient.post(this.basePath + '/leave/callTeacher', Params).subscribe(data => {
			if (data != null && data != '') {
				if (data['status'] == '200') {

				} else {
					this.appService.info(data['msg']);
				}
			}
		}, error => {
			this.appService.error("����");
			//this.route.navigate(['/error'], {queryParams: {'msg': 'http����ʧ��', 'title': ''}});
		}
		);
	}

}

import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { NzModalService } from 'ng-zorro-antd';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../entity/User';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

declare var $: any;
@Component({
	selector: 'app-student',
	templateUrl: './student.component.html'
})
export class StudentComponent implements OnInit {
	isVisibleUpdate = false;
	isVisibleAdd = false;
	basePath;
	infoList = [];
	user: User;
	sendData;
	searchInfo;
	nzNoResult = "正在加载。。。";
	pageLoading = true;

	constructor(private appService: AppService, private modalService: NzModalService, private httpClient: HttpClient, private route: Router,
		private sanitizer: DomSanitizer) {
		this.basePath = this.appService.getBasePath();
		this.user = { id: '', name: '', phone: '', major: '', department: '', password: '', nickname: '', img: '', autograph: '', type: '' };
	}

	ngOnInit() {
		if (!localStorage.getItem("userFlag")) {
			this.route.navigate(['/admin/login']);
			return;
		}

		//active
		$(".navigation li").removeClass();
		$(".navigation li").eq(0).addClass("active");

		this.sendData = { "type": "student" };
		const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
		this.httpClient.post(this.basePath + '/user/selectAllUser', Params).subscribe(data => {
			if (data != null && data != '') {
				if (data['status'] == '200') {
					this.infoList = data['Users'];
					for (let item of this.infoList) {
						let imgUrl = item['headImg'];
						let sanitizerUrl = this.sanitizer.bypassSecurityTrustUrl(imgUrl);
						item['headImg'] = sanitizerUrl;
					}
					//console.log(this.infoList);
					this.pageLoading = false;
				}
			}
		}, error => {
			console.log(error);
		});

	}

	//查询信息
	getSearchInfo() {
		this.pageLoading = true;
		if (this.searchInfo != null && this.searchInfo != '') {
			this.sendData = { "content": this.searchInfo, "type": "student" };
			const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
			this.httpClient.post(this.basePath + '/user/selectUser', Params).subscribe(data => {
				console.log(data);
				if (data != '' && data != null) {
					if (data['status'] == '200') {
						this.infoList = [];
						this.infoList = data['users'];
						this.pageLoading = false;
					}
				}
			}, error => {
				console.log("error");
			});
		}
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
			"type": "student"
		}
		const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
		this.httpClient.post(this.basePath + '/user/createUser', Params).subscribe(data => {
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
		this.user.id = item.userId;
		this.user.name = item.userName;
		this.user.phone = item.userPhone;
		this.user.major = item.userMajor;
		this.user.department = item.userDepartment;
		this.isVisibleUpdate = true;
	}

	//删除信息
	deteleInfo(item) {
		this.sendData = { "userId": item.id };
		const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
		this.httpClient.post(this.basePath + '/user/deleteUser', Params).subscribe(data => {
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
			"type": "student"
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

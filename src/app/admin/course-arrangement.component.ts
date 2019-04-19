import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CourArragent } from '../entity/cour_arragent';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

declare var $: any;
@Component({
	selector: 'app-course-arrangement',
	templateUrl: './course-arrangement.component.html'
})
export class CourseArrangementComponent implements OnInit {
	basePath;
	sendData;
	arragent: CourArragent;
	isVisibleEdit = false;
	isVisibleAdd = false;
	weekList;
	infoList = [];
	searchInfo;
	startTime;
	endTime;
	nzNoResult = "正在加载。。。";
	pageLoading = true;

	constructor(private modalService: NzModalService, private appService: AppService, private httpClient: HttpClient, private route: Router) {
		this.basePath = this.appService.getBasePath();
		this.arragent = { id: '', week: '', courId: '', courName: '', start: '', end: '' };
	}

	ngOnInit() {
		$(".nav-list ul li").removeClass("active");
		$(".nav-list ul li").eq(4).addClass("active");
		this.startTime = new Date();
		this.endTime = new Date();
		this.weekList = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
		const Params = new HttpParams().set("data", "");
		this.httpClient.post(this.basePath + '/arrangement/selectArrangement', Params).subscribe(data => {
			if (data != null && data != '') {
				console.log(data);
				if (data['status'] == '200') {
					this.infoList = data['Arrangements'];
					this.pageLoading = false;
				}
			}
		}, error => {
			console.log("error");
		});
	}

	//编辑信息
	editInfo(item) {
		this.arragent.id = item.carmId;
		this.arragent.week = item.courseWeek;
		this.arragent.start = item.startTime;
		this.arragent.end = item.endTime;
		this.arragent.courId = item.courseId;
		this.arragent.courName = item.courseName;
		this.isVisibleEdit = true;
	}

	//搜索
	getSearch() {
		this.pageLoading = true;
		this.sendData = { "content": this.searchInfo };
		const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
		this.httpClient.post(this.basePath + '/arrangement/selectArrangement', Params).subscribe(data => {
			if (data != null && data != '') {
				this.infoList = [];
				if (data['status'] == '200') {
					this.infoList = data['Arrangements'];
				}
				this.pageLoading = false;
			}
		}, error => {

		});
	}

	//添加信息
	addInfo() {
		this.isVisibleAdd = true;
	}

	//修改内容
	handleEdit() {
		this.arragent.start = this.appService.getHours(this.startTime);
		this.arragent.end = this.appService.getHours(this.endTime);
		this.sendData = {
			"arragementId": this.arragent.id,
			"courseWeek": this.arragent.week,
			"startTime": this.arragent.start,
			"endTime": this.arragent.end,
			"courseId": this.arragent.courId,
			"courseName": this.arragent.courName
		};
		console.log(this.sendData);
		const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
		this.httpClient.post(this.basePath + '/arrangement/updateArrangement', Params).subscribe(data => {
			if (data != null && data != '') {
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
		this.arragent.start = this.appService.getHours(this.startTime);
		this.arragent.end = this.appService.getHours(this.endTime);
		this.sendData = {
			"courseWeek": this.arragent.week,
			"startTime": this.arragent.start,
			"endTime": this.arragent.end,
			"courseId": this.arragent.courId,
			"courseName": this.arragent.courName
		};
		const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
		this.httpClient.post(this.basePath + '/arrangement/createArrangement', Params).subscribe(data => {
			if (data != null && data != '') {
				if (data['status'] == '200') {
					this.appService.info(data['msg']);
					this.isVisibleAdd = false;
					//location.reload(true);
				} else {
					this.appService.info(data['msg']);
				}
			}
		}, error => {
			console.log("error");
		});

	}
	//删除确认
	deleteConfirm(ID) {
		this.sendData = { "carmId": ID };
		const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
		this.modalService.confirm({
			nzTitle: '你确定删除此条信息？',
			nzOkText: '是',
			nzOkType: 'danger',
			nzOnOk: () => {
				this.httpClient.post(this.basePath + '/arrangement/deleteArrangement', Params).subscribe(data => {
					if (data != null && data != '') {
						if (data['status'] == '200') {
							this.appService.info("删除成功!");
							this.isVisibleAdd = false;
							location.reload(true);
						} else {
							this.appService.info("删除失败");
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

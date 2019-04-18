import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Question } from '../entity/question';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

declare var $: any;
@Component({
	selector: 'app-question',
	templateUrl: './question.component.html'
})
export class QuestionComponent implements OnInit {
	basePath;
	question: Question;
	searchValue;
	sendData;
	isVisibleUpdate = false; //修改Model
	infoList = [];
	nzNoResult = "正在加载。。。";
	pageLoading = true;

	constructor(private appService: AppService, private httpClient: HttpClient, private route: Router, private sanitizer: DomSanitizer) {
		this.basePath = this.appService.getBasePath();
		this.question = { id: '', title: '', detail: '', userID: '', time: '', click: '', praise: '', reply: '', course: '', unread: '', src: '' };
	}

	ngOnInit() {
		if (!localStorage.getItem("userFlag")) {
			this.route.navigate(['/admin/login']);
			return;
		}
		//active
		$(".navigation li").removeClass();
		$(".navigation li").eq(3).addClass("active");
		const Params = new HttpParams().set("data", '');
		this.httpClient.post(this.basePath + '/question/selectQuestion', Params).subscribe(data => {
			if (data != null && data != '') {
				if (data['status'] == '200') {
					this.infoList = data['questions'];
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
			console.log("error");
		});
	}

	//搜索信息
	getSearchInfo() {
		this.pageLoading = true;
		this.sendData = { "content": this.searchValue };
		const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
		this.httpClient.post(this.basePath + '/question/selectQuestion', Params).subscribe(data => {
			if (data != null && data != '') {
				this.infoList = [];
				if (data['status'] == '200') {
					this.infoList = data['questions'];
					this.pageLoading = false;
				}
			}
		}, error => {
			console.log("error");
		});
	}

	//修改信息
	updateInfo(item) {
		this.question.id = item.queId;
		this.question.title = item.queTitle;
		this.question.detail = item.queDetail;
		this.question.userID = item.userId;
		this.question.course = item.queCourse;
		this.question.src = item.queImg;
		this.isVisibleUpdate = true;
	}

	//保存修改信息
	handleUpdate() {
		this.sendData = {
			"questionId": this.question.id,
			"title": this.question.title,
			"detail": this.question.detail,
			"userId": this.question.userID,
			"queImg": this.question.src,
		}
		const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
		this.httpClient.post(this.basePath + '/question/updateQuestion', Params).subscribe(data => {
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
			console.log("error");
		});
	}

	//删除信息
	deteleInfo(item) {
		this.sendData = { "questionId": item.id };
		const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
		this.httpClient.post(this.basePath + '/question/deleteQuestion', Params).subscribe(data => {
			if (data != null && data != '') {
				if (data['status'] == '200') {
					this.appService.info(data['msg']);
					location.reload(true);
				} else {
					this.appService.info(data['msg']);
				}
			}
		}, error => {
			console.log("error");
		});
	}

	//关闭Model
	handleCancel() {
		this.isVisibleUpdate = false;
	}

}

import { Component, OnInit } from '@angular/core';
import { EcharService } from '../common/echar.service';
import { ActivatedRoute } from '@angular/router';
import { HttpParams, HttpClient } from '@angular/common/http';
import { AppService } from 'src/app/app.service';


declare var $: any;
@Component({
	selector: 'app-home',
	templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
	basePath;
	list;
	teacherAttribute;
	type;
	sendData;
	selectCourse = [];
	selectStudent = [];
	selectClass = [];
	classHome;
	studentHome;
	courseHome;
	checkFlag;
	datePicker;
	weekAttend = [];
	shouldNum;
	actualNum;
	homeRouter;


	constructor(private echart: EcharService, private activatedRoute: ActivatedRoute, private httpClient: HttpClient, private appService: AppService) {
		this.basePath = this.appService.getBasePath();
	}

	ngOnInit() {
		this.homeRouter = localStorage.getItem("router");
		if (this.homeRouter.indexOf('login') >= 0) {
			localStorage.setItem("router", window.location.href);
			location.reload(true);
		}

		this.type = localStorage.getItem('type');
		this.teacherAttribute = localStorage.getItem("flag");
		if (localStorage.getItem("checkFlag") == 'true') {
			this.checkFlag = '1';
		} else {
			this.checkFlag = '0';
		}
		this.list = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六']

		//this.echart.getMonth('lineChart');

		if (this.checkFlag == '1') {
			$("#check").removeAttr("disabled");
		} else {
			$("#check").attr("disabled", "true");
		}

		$(".attendance-nav ul li").removeClass('active');
		$(".attendance-nav ul li").eq(0).addClass('active');
		if (this.type == 'teacher') {
			this.sendData = { "teacherID": localStorage.getItem("id") };
			const dataParams = new HttpParams().set("data", JSON.stringify(this.sendData));
			this.httpClient.post(this.basePath + '/course/selectCourseByTeacher', dataParams).subscribe(data => {
				if (data != null && data != '') {
					if (data['status'] == '200') {
						console.log(data);
						let info = data['data'];
						let courseName = info['course'];
						let courseID = info['courseId'];
						for (let i = 0; i < courseName.length; i++) {
							this.selectCourse.push({
								"key": courseID[i],
								"value": courseName[i]
							});
						}
						this.selectClass = info['Class'];
					}
				}
			}, error => {
				this.appService.error("下拉框出错！");
			});
		} else if (this.type == 'student') {
			let date = new Date();
			this.getStudent(date);
		}
	}

	//签到
	getCheck() {
		this.sendData = { "stuId": localStorage.getItem("id"), "courseId": localStorage.getItem("checkCourseID") };
		const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
		this.httpClient.post(this.basePath + '/student/report', Params).subscribe(data => {
			if (data != null && data != '') {
				if (data['status'] == '200') {
					this.checkFlag = '0';
					$("#check").attr("disabled", "true");
					this.appService.info(data['msg']);
				} else {
					this.appService.info(data['msg']);
				}
			}
		}, error => {
			this.appService.error("检查代码！");
		});
	}

	//改变班级
	getChange() {
		for (let item of this.selectClass) {
			if (this.classHome == item['teaClass']) {
				this.selectStudent = item['Student'];
			}
		}
	}

	//查询考勤情况
	selectAttendance() {
		let m = 86400000;
		let start, end, weekArr = [];
		let jb = this.getAttend(this.datePicker);
		start = jb.start;
		end = jb.end;
		weekArr = jb.week;
		this.sendData = {
			"stuClass": this.classHome,
			"courseId": this.courseHome,
			"startTime": start,
			"endTime": end
		};
		const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
		this.httpClient.post(this.basePath + '/student/selectWeekReport', Params).subscribe(data => {
			if (data != null && data != '') {
				if (data['status'] == '200') {
					for (let item of this.selectClass) {
						if (item['teaClass'] == this.classHome) {
							for (let list of item['Student']) {
								this.weekAttend.push({
									"name": list['name'],
									"id": list['studentID'],
									"Mon": '0',
									"Tue": '0',
									"Wed": '0',
									"Thue": '0',
									"Fri": '0',
								});
							}
						}
					}
					console.log(data);
					let list = data['students'];
					let normal1 = [], normal2 = [], normal3 = [], normal4 = [], normal5 = [];
					let vacation1 = [], vacation2 = [], vacation3 = [], vacation4 = [], vacation5 = [];
					for (let value of this.weekAttend) {
						for (let item of list) {
							if (value.id == item['stuId']) {
								//星期一
								if (item['reportDay'] == weekArr[0]) {
									if (item['isTruancy'] == '1') {
										value.Mon = '2';
									} else {
										value.Mon = '1';
									}
								}
								//星期二
								if (item['reportDay'] == weekArr[1]) {
									if (item['isTruancy'] == '1') {
										value.Tue = '2';
									} else {
										value.Tue = '1';
									}
								}
								//星期三
								if (item['reportDay'] == weekArr[2]) {
									if (item['isTruancy'] == '1') {
										value.Wed = '2';
									} else {
										value.Wed = '1';
									}
								}
								//星期四
								if (item['reportDay'] == weekArr[3]) {
									if (item['isTruancy'] == '1') {
										value.Thue = '2';
									} else {
										value.Thue = '1';
									}
								}
								//星期五
								if (item['reportDay'] == weekArr[4]) {
									if (item['isTruancy'] == '1') {
										value.Fri = '2';
									} else {
										value.Fri = '1';
									}
								}
								/*结束*/
							}
						}
					}
				}
			}
		}, error => {
			this.appService.error("查询考勤出错!");
		});

	}

	getAttend(date) {
		let m = 86400000;
		let dayWeek = date.getDay();
		let start, end, weekArr = [];
		if (dayWeek == '0') {
			start = this.appService.getDay(date.getTime() - 6 * m);
			end = this.appService.getDay(date.getTime() - 2 * m);
			weekArr = [start, this.appService.getDay(date.getTime() - 5 * m), this.appService.getDay(date.getTime() - 4 * m), this.appService.getDay(date.getTime() - 3 * m), end];
		} else if (dayWeek == '1') {
			start = this.appService.getDay(date.getTime());
			end = this.appService.getDay(date.getTime() + 4 * m);
			weekArr = [start, this.appService.getDay(date.getTime() + m), this.appService.getDay(date.getTime() + 2 * m), this.appService.getDay(date.getTime() + 3 * m), end];
		} else if (dayWeek == '2') {
			start = this.appService.getDay(date.getTime() - m);
			end = this.appService.getDay(date.getTime() + 3 * m);
			weekArr = [start, this.appService.getDay(date.getTime()), this.appService.getDay(date.getTime() + m), this.appService.getDay(date.getTime() + 2 * m), end];
		} else if (dayWeek == '3') {
			start = this.appService.getDay(date.getTime() - 2 * m);
			end = this.appService.getDay(date.getTime() + 2 * m);
			weekArr = [start, this.appService.getDay(date.getTime() - m), this.appService.getDay(date.getTime()), this.appService.getDay(date.getTime() + m), end];
		} else if (dayWeek == '4') {
			start = this.appService.getDay(date.getTime() - 3 * m);
			end = this.appService.getDay(date.getTime() + m);
			weekArr = [start, this.appService.getDay(date.getTime() - 2 * m), this.appService.getDay(date.getTime() - m), this.appService.getDay(date.getTime()), end];
		} else if (dayWeek == '5') {
			start = this.appService.getDay(date.getTime() - 4 * m);
			end = this.appService.getDay(date.getTime());
			weekArr = [start, this.appService.getDay(date.getTime() - 3 * m), this.appService.getDay(date.getTime() - 2 * m), this.appService.getDay(date.getTime() - m), end];
		} else if (dayWeek == '6') {
			start = this.appService.getDay(date.getTime() - 5 * m);
			end = this.appService.getDay(date.getTime() - m);
			weekArr = [start, this.appService.getDay(date.getTime() - 4 * m), this.appService.getDay(date.getTime() - 3 * m), this.appService.getDay(date.getTime() - 2 * m), end];
		}

		return {
			"start": start,
			"end": end,
			"week": weekArr,
		};
	}

	//日历
	onValueChange(value: Date): void {
		console.log(value);
		this.getStudent(value);
	}

	//获取学生一周考勤记录
	getStudent(date) {
		let start, end, weekArr = [];
		let jb = this.getAttend(date);
		weekArr = jb.week;
		this.sendData = {
			"stuId": localStorage.getItem("id"),
			"startTime": jb['start'],
			"endTime": jb['end']
		};
		this.weekAttend = [];
		const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
		this.httpClient.post(this.basePath + '/student/selectMyReport', Params).subscribe(data => {
			if (data != null && data != '') {
				if (data['status'] == '200') {
					// console.log(data);
					let info = data['students'];
					let course = [];
					for (let item of info) {
						let flag = 1;
						for (let i = 0; i < course.length; i++) {
							if (item['reportCourse'] == course[i]) {
								flag = 0; break;
							}
						}
						if (flag == 1) {
							course.push(item['reportCourse']);
						}
					}

					for (let item of course) {
						this.weekAttend.push({
							"course": item,
							"Mon": '0',
							"Tue": '0',
							"Wed": '0',
							"Thue": '0',
							"Fri": '0',
						});
					}

					//组装数据
					for (let item of this.weekAttend) {
						for (let value of info) {
							if (item.course == value['reportCourse']) {
								//星期一 // 0旷课 1请假 2签到
								if (value['reportDay'] == weekArr[0]) {
									item.Mon = value['reportStatus'];
								}
								//星期二
								if (value['reportDay'] == weekArr[1]) {
									item.Tue = value['reportStatus'];
								}
								//星期三
								if (value['reportDay'] == weekArr[2]) {
									item.Wed = value['reportStatus'];
								}
								//星期四
								if (value['reportDay'] == weekArr[3]) {
									item.Thue = value['reportStatus'];
								}
								//星期五
								if (value['reportDay'] == weekArr[4]) {
									item.Fri = value['reportStatus'];
								}
							}
						}
					}

				}
			}
		}, error => {
			this.appService.error("检查代码");
		});
	}

}

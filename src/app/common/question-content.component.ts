import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-content',
  templateUrl: './question-content.component.html'
})
export class QuestionContentComponent implements OnInit {
  basePath;
  sendData;
  questionId;
  queUserID;  //���������û�ID
  queUserNickName;  //���������û��ǳ�
  queUserHeadImg;  //���������û�ͷ��
  questionInfo;
  loginUserID;   //��¼�û�ID
  queContent;

  constructor(private appService: AppService, private httpClient: HttpClient, private activatedRoute: ActivatedRoute) {
    this.basePath = this.appService.getBasePath();
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.questionId = params['questionId'];
      this.queUserID = params['userID'];
    });
    // ��ȡ�û���Ϣ
    const userParams = new HttpParams().set("data", JSON.stringify({"content": this.queUserID}));
    this.httpClient.post(this.basePath + '/user/selectUser', userParams).subscribe(data => {
      if (data['status'] == '200') {
          this.queUserNickName = data['user']['nickname'];
          this.queUserHeadImg = data['user']['headImg'];
      }
    }, error => {
      console.log("error");
    });

 
    this.sendData = {"questionId": this.questionId};
    const Params = new HttpParams().set("data", JSON.stringify(this.sendData));
    this.httpClient.post(this.basePath + '/question/questionDetail', Params).subscribe(data => {
      if (data['status'] == '200') {
        console.log(data);
        this.questionInfo = data['question'];
        //
      }
    }, error => {
      console.log(error);
    });

  }

  // ����
  getPraiseCount() {
    this.sendData = {
      "ID": this.questionId,
      "userId": this.queUserID,
    }
  }

  //ɾ��
  deleteComment() {
    /*
    ˼·�� 
       1, �ж������Ƿ�Ϊ��ǰ��¼�û�:
            ���ǵ�ǰ�û������ӣ��������ɾ��,
            �����ǣ���ֻ��ɾ���Լ����������۵�����  ������Ȩ�޲��㣩
        
    */
  }

  //����
  showCommentReply() {

  }

}

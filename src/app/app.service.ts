import {Injectable} from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';

@Injectable()
export class AppService {
    constructor(private modalService: NzModalService, private datePipe: DatePipe) { }

    //输入时间格式
    getDate(date) {
        return this.datePipe.transform(date, "yyyy-MM-dd HH:mm:ss'");
    }
    
    //时间转换时分
    getHours(date){
        return this.datePipe.transform(date, "HH:mm");
    }
    //时间转换年月日
    getDay(date){
        return this.datePipe.transform(date, "yyyy-MM-dd");
    }
    
    getBasePath() {
        const BasePath = 'http://127.0.0.1:8080';
        return BasePath;
    }
    
    info(message): void {
        this.modalService.info({
          nzContent: message
        });
    }

    succcess(message): void {
        this.modalService.success({
            nzContent: message
        });
    }

    error(message): void {
        this.modalService.error({
          nzContent: message
        });
    }
}

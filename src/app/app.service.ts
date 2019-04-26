import {Injectable} from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';

@Injectable()
export class AppService {
    constructor(private modalService: NzModalService, private datePipe: DatePipe) { }

    // 输入时间格式
    getDate(date) {
        return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss\'');
    }

    getBasePath() {
        const BasePath = 'http://localhost:8080/forum';
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

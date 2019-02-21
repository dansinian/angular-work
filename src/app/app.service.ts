import {Injectable} from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';

@Injectable()
export class AppService {
    constructor(private modalService: NzModalService, private datePipe: DatePipe) { }

    //����ʱ���ʽ
    getDate(date) {
        return this.datePipe.transform(date, "yyyy-MM-dd HH:mm:ss'");
    }
    
    getBasePath() {
        //const BasePath = 'http://127.0.0.1:8080';
        const BasePath = 'http://127.0.0.1:50081';
        //http://localhost:50081/
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

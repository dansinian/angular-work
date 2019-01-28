import {Injectable} from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';
//import { Subject } from 'rxjs/Subject';

@Injectable()
export class AppService {
    constructor(private modalService: NzModalService, private datePipe: DatePipe) { }

    //sub = new Subject<any>();
    //����ʱ���ʽ
    getDate(date) {
        return this.datePipe.transform(date, "yyyy-MM-dd HH:mm:ss'");
    }
    
    getBasePath() {
        const BasePath = 'http://127.0.0.1:8080';
        return BasePath;
    }
    
    info(message): void {
        this.modalService.info({
          nzTitle: 'This is a notification message',
          nzContent: message,
          nzOnOk: () => console.log('Info OK')
        });
    }

    succcess() {
        this.modalService.success({
            nzTitle: 'This is a success message',
            nzContent: 'some messages...some messages...'
        });
    }

    error(message): void {
        this.modalService.error({
          nzContent: message
        });
    }
}

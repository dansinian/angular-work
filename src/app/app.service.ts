import {Injectable} from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';

@Injectable()
export class AppService {
    constructor(private modalService: NzModalService) { }
    getBasePath() {
        const BasePath = '';
        return BasePath;
    }
    
    info(): void {
        this.modalService.info({
          nzTitle: 'This is a notification message',
          nzContent: '<p>some messages...some messages...</p><p>some messages...some messages...</p>',
          nzOnOk: () => console.log('Info OK')
        });
      }

    succcess() {
        this.modalService.success({
            nzTitle: 'This is a success message',
            nzContent: 'some messages...some messages...'
        });
    }

    error(): void {
        this.modalService.error({
          nzTitle: 'This is an error message',
          nzContent: 'some messages...some messages...'
        });
      }
}

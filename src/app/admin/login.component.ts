import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginteacher',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  basePath;

    constructor( private el: ElementRef, private httpClient: HttpClient, private appService: AppService, private route: Router) {
        this.basePath = this.appService.getBasePath();
    }

  ngOnInit(): void {
    
    
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminRoutingModule } from './admin-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { NgZorroAntdModule } from 'ng-zorro-antd';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    AdminRoutingModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ],
  declarations: [
  LoginComponent]
})
export class AdminModule { }

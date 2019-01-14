import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [
    AdminRoutingModule,
    CommonModule,
    RouterModule
  ],
  declarations: [
      StudentComponent,
      TeacherComponent
  ]
})
export class AdminModule { }

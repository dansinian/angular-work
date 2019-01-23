import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StudentComponent } from './student.component';
import { TeacherComponent } from './teacher.component';
import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationComponent } from './navigation.component';
import { CourseComponent } from './course.component';

@NgModule({
  imports: [
    AdminRoutingModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
      LoginComponent,
      StudentComponent,
      TeacherComponent,
      NavigationComponent,
      CourseComponent
  ]
})
export class AdminModule { }

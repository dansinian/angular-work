import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';


import { AdminRoutingModule } from './admin-routing.module';
import { StudentComponent } from './student.component';
import { TeacherComponent } from './teacher.component';
import { LoginComponent } from './login.component';
import { NavigationComponent } from './navigation.component';
import { HeaderComponent } from './header.component';
import { CourseComponent } from './course.component';
import { QuestionComponent } from './question.component';
import { CommentComponent } from './comment.component';
import { ReplyComponent } from './reply.component';
import { CreateComponent } from './create.component';
import { QuestionPageComponent } from './question-page.component';

@NgModule({
  imports: [
    AdminRoutingModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    FileUploadModule
  ],
  declarations: [
    LoginComponent,
    NavigationComponent,
    StudentComponent,
    TeacherComponent,
    HeaderComponent,
    CourseComponent,
    QuestionComponent,
    CommentComponent,
    ReplyComponent,
    CreateComponent,
    QuestionPageComponent,
  ]
})
export class AdminModule { }

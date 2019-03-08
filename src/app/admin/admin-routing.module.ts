import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login.component";
import { StudentComponent } from 'src/app/admin/student.component';
import { TeacherComponent } from 'src/app/admin/teacher.component';
import { CourseComponent } from 'src/app/admin/course.component';
import { QuestionComponent } from 'src/app/admin/question.component';
import { CommentComponent } from './comment.component';
import { ReplyComponent } from './reply.component';
import { CreateComponent } from './create.component';


const AdminRoutes: Routes = [
    
    { path: '', redirectTo: '/admin/login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent, canActivate: [] },
    { path: 'student', component: StudentComponent },
    { path: 'teacher', component: TeacherComponent },
    { path: 'course', component: CourseComponent },
    { path: 'question', component: QuestionComponent },
    { path: 'comment', component: CommentComponent },
    { path: 'reply', component: ReplyComponent },
    { path: 'create', component: CreateComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(AdminRoutes)
  ],
  declarations: [],
  providers: []
})
export class AdminRoutingModule { }

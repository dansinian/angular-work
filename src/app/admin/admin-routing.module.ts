import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login.component";
import { StudentComponent } from 'src/app/admin/student.component';
import { TeacherComponent } from 'src/app/admin/teacher.component';
import { CourseComponent } from 'src/app/admin/course.component';
import { QuestionComponent } from 'src/app/admin/question.component';


const AdminRoutes: Routes = [
    
    { path: '', redirectTo: '/admin/login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent, canActivate: [] },
    { path: 'student', component: StudentComponent },
    { path: 'teacher', component: TeacherComponent },
    { path: 'course', component: CourseComponent },
    { path : 'question', component: QuestionComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(AdminRoutes)
  ],
  declarations: [],
  providers: []
})
export class AdminRoutingModule { }

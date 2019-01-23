import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student.component';
import { TeacherComponent } from './teacher.component';
import { LoginComponent } from './login.component';
import { CourseComponent } from './course.component';

const AdminRoutes: Routes = [
    
    { path: '', redirectTo: '/admin/login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'student', component: StudentComponent },
    { path: 'teacher', component: TeacherComponent },
    { path:  'course', component: CourseComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(AdminRoutes)
  ],
  declarations: []
})
export class AdminRoutingModule { }

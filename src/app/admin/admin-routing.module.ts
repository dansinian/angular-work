import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student.component';
import { TeacherComponent } from './teacher.component';
import { LoginComponent } from './login.component';
import { CourseComponent } from './course.component';
import { LeaveListComponent } from './leave-list.component';
import { CourseArrangementComponent } from './course-arrangement.component';
import { AdminGuardService } from './admin-guard.service';

const AdminRoutes: Routes = [
    
    { path: '', redirectTo: '/admin/login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent, canActivate: [] },
    { path: 'student', component: StudentComponent },
    { path: 'teacher', component: TeacherComponent },
    { path: 'course', component: CourseComponent },
    { path: 'leave-list', component: LeaveListComponent },
    { path: 'course-arrangement', component: CourseArrangementComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(AdminRoutes)
  ],
  declarations: [],
  providers: []
})
export class AdminRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { LoginComponent } from '../common/login.component';

const AdminRoutes: Routes = [
    
    { path: '', redirectTo: '/student', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'student', component: StudentComponent },
    { path: 'teacher', component: TeacherComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(AdminRoutes)
  ],
  declarations: []
})
export class AdminRoutingModule { }

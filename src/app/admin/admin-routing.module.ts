import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { StudentComponent } from './student.component';
import { LoginComponent } from "./login.component";


const AdminRoutes: Routes = [
    
    { path: '', redirectTo: '/admin/login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent, canActivate: [] }
];

@NgModule({
  imports: [
    RouterModule.forChild(AdminRoutes)
  ],
  declarations: [],
  providers: []
})
export class AdminRoutingModule { }

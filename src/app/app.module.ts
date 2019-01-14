import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './common/login.component';
import { AppService } from './app.service';
import { ErrorComponent} from './common/error.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './common/header.component';
import { FooterComponent } from './common/footer.component';
import { LeaveComponent } from './leave/leave.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    HomeComponent,
    LoginComponent,
    ErrorComponent,
    HeaderComponent,
    FooterComponent,
    LeaveComponent
  ],
  imports: [
    BrowserModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [AppService, { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }

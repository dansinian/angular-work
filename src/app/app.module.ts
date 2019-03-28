import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { IconDefinition } from '@ant-design/icons-angular';
import { NgZorroAntdModule, NZ_I18N, zh_CN, NZ_ICONS  } from 'ng-zorro-antd';
import * as AllIcons from '@ant-design/icons-angular/icons';
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
import { DetailComponent } from './detail/detail.component';
import { EcharService } from './common/echar.service';
import { CheckComponent } from './check/check.component';
import { LoginGuardService } from 'src/app/common/login-guard.service';

registerLocaleData(zh);
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    HomeComponent,
    LoginComponent,
    ErrorComponent,
    HeaderComponent,
    FooterComponent,
    LeaveComponent,
    DetailComponent,
    CheckComponent
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
  providers: [
    AppService, EcharService, LoginGuardService,
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: NZ_ICONS, useValue: icons }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

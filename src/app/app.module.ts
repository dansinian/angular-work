import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { IconDefinition } from '@ant-design/icons-angular';
import { NgZorroAntdModule, NZ_I18N, en_US, NZ_ICONS  } from 'ng-zorro-antd';
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

registerLocaleData(en);
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
    DetailComponent
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
    AppService, EcharService, 
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_ICONS, useValue: icons }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

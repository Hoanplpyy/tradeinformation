import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleChartsModule, GOOGLE_CHARTS_LAZY_CONFIG } from 'angular-google-charts';
import { PigtradeinformationComponent } from './pigtradeinformation/pigtradeinformation.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationComponent } from './navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardInformationComponent } from './dashboard-information/dashboard-information.component';
import { SettingComponent } from './setting/setting.component';
import { NewsComponent } from './news/news.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared.module';
import { googleChartsConfigFactory, GoogleChartsConfigService } from './googleChart.service';

@NgModule({
  declarations: [
    AppComponent,
    PigtradeinformationComponent,
    NavigationComponent,
    DashboardComponent,
    DashboardInformationComponent,
    SettingComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GoogleChartsModule,
    NgbModule,
    BrowserAnimationsModule,
    SharedModule
  ],
   providers: [
    //GoogleChartsConfigService
  //   ,
  //   { provide: GOOGLE_CHARTS_LAZY_CONFIG, useFactory: googleChartsConfigFactory, deps: [GoogleChartsConfigService] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

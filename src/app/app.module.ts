import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { UIState } from './states/Ui.state';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthState } from './states/Auth.state';
import { AlertState } from './states/Alert.state';
import { NewsComponent } from './news/news.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { NewsRouteResolver } from './resolver/newsRoute.resolver';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NewsState } from './states/News.state';
import { HttpErrorInterceptor } from './interceptor/httpconfig.interceptor';
import { NewsItemComponent } from './news-item/news-item.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    NewsComponent,
    NewsItemComponent,
    NewsDetailComponent,
    NotFoundComponent,
  ],
  imports: [
    HttpClientModule,
    FontAwesomeModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    NgxLoadingModule.forRoot({}),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([UIState, AuthState, AlertState, NewsState], {
      developmentMode: !environment.production
    }), NgxsRouterPluginModule.forRoot(),
    NgbModule
  ],
  providers: [DatePipe, NewsRouteResolver, {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

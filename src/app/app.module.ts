import { AppLayoutModule } from './layout/app.layout.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerInterceptor } from './shared/spinner/spinner.interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from "@angular/common/http";
import { ConfigureModule } from './configure/configure.module';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppLayoutModule,
    LoginModule,
    RegisterModule,
    ConfigureModule,


    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: ()=>{ return localStorage.getItem('token')},
        allowedDomains: [environment.userApidoman,environment.appApiDoman],
        disallowedRoutes: [""],
      },
    }),

  ],
  providers: [
   {provide:HTTP_INTERCEPTORS,useClass:SpinnerInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

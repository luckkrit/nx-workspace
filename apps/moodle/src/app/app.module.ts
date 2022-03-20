import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { RegisterComponent } from './register/register.component';
import { CourseCategoryComponent } from './course-category/course-category.component';
import { CourseComponent } from './course/course.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AlertsComponent } from './alerts/alerts.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, UserDetailComponent, RegisterComponent, CourseCategoryComponent, CourseComponent, NavbarComponent, AlertsComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

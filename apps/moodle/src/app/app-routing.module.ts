import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { CourseCategoryComponent } from './course-category/course-category.component';
import { CourseComponent } from './course/course.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserCourseComponent } from './user-course/user-course.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/user-detail',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'user-detail',
    component: UserDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user-course',
    component: UserCourseComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'course-category',
    component: CourseCategoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'course/:categoryId',
    component: CourseComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

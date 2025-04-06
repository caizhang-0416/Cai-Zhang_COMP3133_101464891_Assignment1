// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import {AuthGuard} from "./auth.guard";
import {EmployeeAddComponent} from './components/employee-add/employee-add.component';
import {EmployeeUpdateComponent} from './components/employee-update/employee-update.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'employees', component: EmployeeListComponent, canActivate: [AuthGuard] },
  { path: 'employee/add', component: EmployeeAddComponent, canActivate: [AuthGuard] },
  { path: 'employee/edit/:id', component: EmployeeUpdateComponent, canActivate: [AuthGuard] },
  { path: 'employee/:id', component: EmployeeDetailsComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/employees', pathMatch: 'full' }
];

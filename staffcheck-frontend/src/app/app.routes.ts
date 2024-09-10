import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { AttendanceComponent } from './attendance/attendance.component';
import {LoginComponent} from "./login/login.component";
import {ScannerComponent} from "./scanner/scanner.component";
import {EditEmployeeComponent} from "./edit-employee/edit-employee.component";
import {NotAuthorizedComponent} from "./not-authorized/not-authorized.component";
import {authenticationGuard} from "./guards/authentication.guard";
import {authorizationGuard} from "./guards/authorization.guard";
import {AdminComponent} from "./admin/admin.component";
export const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "scanner", component: ScannerComponent },
  { path: "", redirectTo: "/login", pathMatch: "full" },
  {path: "admin", component: AdminComponent, canActivate: [authenticationGuard], children: [

      {path: "dashboard", component: DashboardComponent},
      { path: "employees", component: UsersComponent },
      { path: "mark", component: ScannerComponent },
      { path: "attendance", component: AttendanceComponent },
      { path: "edit-employee/:id", component: EditEmployeeComponent, canActivate: [authorizationGuard], data: { roles: "ADMIN" } },
    { path: "notAuthorized", component: NotAuthorizedComponent },


    ]
  },
];


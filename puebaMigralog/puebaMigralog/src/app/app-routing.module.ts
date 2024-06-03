import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppSingupComponent } from './components/app-singup/app-singup.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { IndexComponent } from './components/index/index.component';
import { ChangeThemeComponent } from './components/change-theme/change-theme.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { NewIncidentComponent } from './components/new-incident/new-incident.component';
import { PersonalAreaComponent } from './components/personal-area/personal-area.component';
import { AuthGuard } from './auth/auth.guard';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { EditIncidentComponent } from './components/edit-incident/edit-incident.component';
import { MaintenanceAreaComponent } from './components/maintenance-area/maintenance-area.component';

const routes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'app-singup', component: AppSingupComponent },
  { path: 'login-user', component: LoginUserComponent },
  { path: 'change-theme', component: ChangeThemeComponent, canActivate: [AuthGuard] },
  { path: 'list-users', component: ListUsersComponent, canActivate: [AuthGuard] },
  { path: 'update-user/:id', component: UpdateUserComponent, canActivate: [AuthGuard] },
  { path: 'new-incident', component: NewIncidentComponent, canActivate: [AuthGuard]},
  { path: 'personal-area', component: PersonalAreaComponent, canActivate: [AuthGuard] },
  { path: 'edit-incident/:id', component: EditIncidentComponent, canActivate: [AuthGuard] },
  { path: 'maintenance', component: MaintenanceAreaComponent, canActivate: [AuthGuard] },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'signup', component: AppSingupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

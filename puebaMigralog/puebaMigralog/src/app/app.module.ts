import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NavigationMenuComponent } from './components/navigation-menu/navigation-menu.component';
import { ContainerComponent } from './components/container/container.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { AppSingupComponent } from './components/app-singup/app-singup.component';
import { IndexComponent } from './components/index/index.component';
import { ChangeThemeComponent } from './components/change-theme/change-theme.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewIncidentComponent } from './components/new-incident/new-incident.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DatePipe } from '@angular/common';
import { PersonalAreaComponent } from './components/personal-area/personal-area.component';
import { CanActivateViaAuthGuard } from './auth.guard';
import { AuthService } from './services/auth.service';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { NgChartsModule } from 'ng2-charts';
import { BaseChartDirective } from 'ng2-charts';
import { EditIncidentComponent } from './components/edit-incident/edit-incident.component';
import { IncidentDetailsModalComponent } from './components/incident-details-modal/incident-details-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthInterceptorService } from './auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationMenuComponent,
    ContainerComponent,
    LoginUserComponent,
    AppFooterComponent,
    AppSingupComponent,
    IndexComponent,
    ChangeThemeComponent,
    ListUsersComponent,
    UpdateUserComponent,
    NewIncidentComponent,
    PersonalAreaComponent,
    AboutUsComponent,
    EditIncidentComponent,
    IncidentDetailsModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatDialogModule,
    MatNativeDateModule,
    MatFormFieldModule,
    NgChartsModule
  ],
  providers: [
    DatePipe,
    CanActivateViaAuthGuard,
    AuthService,
    { provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

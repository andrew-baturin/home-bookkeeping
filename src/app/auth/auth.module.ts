import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// Modules
import {AuthRoutingModule} from './auth-routing.module';

// Services
import {AuthService} from './services/auth.service';
import {AuthenticatedService} from './services/authenticated.service';

// Components
import {LayoutComponent} from './layout/layout.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';


@NgModule({
  declarations: [
    LayoutComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ],
  providers: [
    AuthService,
    AuthenticatedService
  ]
})
export class AuthModule {
}

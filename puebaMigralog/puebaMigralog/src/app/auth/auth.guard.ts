import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CanActivate } from "@angular/router";


@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    // If the user is not logged in we'll send them back to the home page
    if (!this.authService.isLoggedIn()) {
      alert("No estás logueado");
      this.router.navigate(["/"]);
      return false;
    }
    return true;
  }
}
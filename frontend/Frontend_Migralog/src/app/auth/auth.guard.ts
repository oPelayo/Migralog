import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CanActivate } from "@angular/router";


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    // If the user is not logged in we'll send them back to the home page
    if (!this.authService.isLoggedIn()) {
      alert("You are not logged in");
      this.router.navigate(["/"]);
      return false;
    }
    return true;
  }
}


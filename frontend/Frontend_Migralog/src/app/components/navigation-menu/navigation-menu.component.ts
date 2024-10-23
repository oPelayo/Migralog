import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.css']
})
export class NavigationMenuComponent implements OnInit {
  isMenuOpen = false;
  isAdmin = false;
  isUserLoggedIn = false;
  profileImageUrl: string;
  userName: string;

  constructor(private router: Router, private authService: AuthService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    // Check if the user is logged in
    this.authService.currentUser.subscribe(user => {
      this.isUserLoggedIn = !!user;

      if (this.isUserLoggedIn && user) {
        this.userName = user.user.name;
        this.isAdmin = user.user.authorities.some((auth: { authority: string; }) => auth.authority === 'ROLE_ADMIN');
      } else {
        this.isAdmin = false;
      }

      this.profileImageUrl = this.isUserLoggedIn ? 'assets/images/image2.jpg' : 'assets/images/image1.jpg';
      this.cd.detectChanges(); // Force change detection
    });
  }
  

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  login() {
    this.router.navigate(['/login-user']);
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }
}

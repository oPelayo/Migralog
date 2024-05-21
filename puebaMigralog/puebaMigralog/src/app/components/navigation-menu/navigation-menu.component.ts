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
  isUserLoggedIn = false;
  profileImageUrl: string;
  userName: string;

  constructor(private router: Router, private authService: AuthService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    // Verificar si el usuario está iniciado sesión
    this.authService.currentUser.subscribe(user => {
      this.isUserLoggedIn = !!user;

      if (this.isUserLoggedIn && user) {
        this.userName = user.user.name;
      }

      this.profileImageUrl = this.isUserLoggedIn ? 'assets/images/image2.jpg' : 'assets/images/image1.jpg';
      this.cd.detectChanges(); // Forzar detección de cambios
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

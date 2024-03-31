import { Component, OnInit } from '@angular/core';
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

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    // Verificar si el usuario está iniciado sesión
    const currentUser = sessionStorage.getItem('currentUser');
    this.isUserLoggedIn = !!currentUser;

    // Obtener el nombre de usuario
    if (this.isUserLoggedIn && currentUser) {
      const user = JSON.parse(currentUser);
      this.userName = user.user.name;
    }

    // Lógica para determinar la URL de la imagen del perfil
    this.profileImageUrl = this.isUserLoggedIn ? 'assets/images/image2.jpg' : 'assets/images/image1.jpg';
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
    this.router.navigate(['/login-user']);
    window.location.reload();
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-app-singup',
  templateUrl: './app-singup.component.html',
  styleUrls: ['./app-singup.component.css']
})
export class AppSingupComponent implements OnInit {
  user = new User();
  isSubmitting = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  saveUser() {
    this.isSubmitting = true; // Indica que el formulario se está enviando
    
    // Llamamos al servicio para guardar el usuario
    this.userService.newUser(this.user).subscribe(
      dato => {
        // Se ejecuta si la petición se completa con éxito
        console.log(dato);
        alert("Usuario Creado Correctamente");
        this.router.navigate(['index']);
      },
      error => {
        // Se ejecuta si hay un error en la petición
        console.error("Error:", error);
        alert("Error al crear usuario. Por favor, inténtalo de nuevo.");
        this.isSubmitting = false; // Volvemos a establecer el estado del formulario
      }
    );
  }
}

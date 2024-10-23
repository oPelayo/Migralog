import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ThemeService } from 'src/app/services/theme.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-app-singup',
  templateUrl: './app-singup.component.html',
  styleUrls: ['./app-singup.component.css']
})
export class AppSingupComponent implements OnInit {
  user = new User();
  isSubmitting = false;
  backgroundColorClass: string = '';
  showGeneralError = false;

  constructor(private userService: UserService, private router: Router, private themeService: ThemeService) {}

  ngOnInit(): void 
  {
    this.themeService.getSelectedBackgroundColor().subscribe(color => {
      this.backgroundColorClass = color;
    });
  }

  onSubmit(form: any) {
    if (form.invalid) {
      this.showGeneralError = true;
      return;
    }
    this.showGeneralError = false;
    this.saveUser();
  }

  saveUser() {
    this.isSubmitting = true; 
    
    // We call the service to save the user
    this.userService.newUser(this.user).subscribe(
      dato => {
        console.log(dato);
        alert("Successfully Created User");
        this.router.navigate(['index']);
      },
      error => {
        console.error("Error:", error);
        alert("Error creating user. Please try again.");
        this.isSubmitting = false; // We establish the state of the form again
      }
    );
  }
}

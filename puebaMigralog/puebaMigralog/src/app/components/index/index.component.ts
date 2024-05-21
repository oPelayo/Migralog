import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  phraseDay: string;
  userName: string;
  isUserLoggedIn = false;

  constructor(private apiService: ApiService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getPhraseDay();
    this.authService.currentUser.subscribe(user => {
      this.isUserLoggedIn = !!user;
      if (this.isUserLoggedIn) {
        this.userName = user.user.name;
      }
    });
  }

  getPhraseDay(): void {
    this.apiService.getDatos()
      .subscribe(
        (data: any) => {
          this.phraseDay = data.phrase;
        },
        (error) => {
          console.error('Error al obtener la frase del día:', error);
        }
      );
  }
}

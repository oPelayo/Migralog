import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  phraseDay: string;
  userName: string;
  isUserLoggedIn = false;
  backgroundColorClass: string = '';

  constructor(private apiService: ApiService, private authService: AuthService, private themeService: ThemeService) { }

  ngOnInit(): void {
    this.getPhraseDay();
    this.authService.currentUser.subscribe(user => {
      this.isUserLoggedIn = !!user;
      if (this.isUserLoggedIn) {
        this.userName = user.user.name;
      }
    });

    // Subscribe to theme changes
    this.themeService.getSelectedBackgroundColor().subscribe(color => {
      this.backgroundColorClass = color;
    });
  }

  getPhraseDay(): void {
    this.apiService.getDatos()
      .subscribe(
        (data: any) => {
          this.phraseDay = data.phrase;
        },
        (error) => {
          console.error('Error getting quote of the day:', error);
        }
      );
  }
}

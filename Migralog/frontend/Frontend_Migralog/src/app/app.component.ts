import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pruebaMigralog';

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.selectedBackgroundColor$.subscribe(color => {
      this.applyTheme(color);
    });

    // this.themeService.selectedColor$.subscribe(color => {
    //   this.applyTextColor(color);
    // });

  }

  private applyTheme(color: string) {
    document.body.className = color;
  }

  // private applyTextColor(color: string) {
  //   document.body.style.color = color; 
  // }

}

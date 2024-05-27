import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-change-theme',
  templateUrl: './change-theme.component.html',
  styleUrls: ['./change-theme.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class ChangeThemeComponent implements OnInit {
  themes = [
    { name: 'Fondo Menta', color: 'menta' },
    { name: 'Fondo Bosque', color: 'azul' },
    { name: 'Fondo Vichyssoise', color: 'verde' }
  ];

  constructor(public themeService: ThemeService) {}

  ngOnInit(): void {}

  setSelectedBackgroundColor(color: string) {
    this.themeService.setSelectedBackgroundColor(color);
  }

  setSelectedColor(color: string) {
    this.themeService.setSelectedColor(color);
  }

  setSelectedFontSize(size: number) {
    this.themeService.setSelectedFontSize(size);
  }

/*  setSelectedMenuColor(color: string) {
    this.themeService.setSelectedMenuColor(color);
  }*/
}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-change-theme',
  templateUrl: './change-theme.component.html',
  styleUrls: ['./change-theme.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class ChangeThemeComponent implements OnInit {
  selectedColor: string = '#98DECB';
  
  
  // themes = [
  //   { name: 'Fondo Bosque', color: 'menta' },
  //   { name: 'Fondo De york', color: 'azul' },
  //   { name: 'Fondo Vichyssoise', color: 'verde' }
  // ];

  constructor(public themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.getSelectedBackgroundColor().subscribe(color => {
      this.selectedColor = color;
    });
  }
  
  // Update the background color in the service
  onColorPick(event: any) {
    const color = event.target.value;
    this.selectedColor = color;
    this.themeService.setSelectedBackgroundColor(color); 
  }

  //Background color picker
  // setSelectedBackgroundColor(color: string) {
  //   this.themeService.setSelectedBackgroundColor(color);
  // }

  //Selector color de letra, por implementar
  // setSelectedColor(color: string) {
  //   this.themeService.setSelectedColor(color);
  // }

  // setSelectedFontSize(size: number) {
  //   this.themeService.setSelectedFontSize(size);
  // }
  //Descartado por contrastes, color de Navbar
  /*  setSelectedMenuColor(color: string) {
      this.themeService.setSelectedMenuColor(color);
    }*/
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private selectedBackgroundColorSubject = new BehaviorSubject<string>(''); // Valor predeterminado: ''
  selectedBackgroundColor$ = this.selectedBackgroundColorSubject.asObservable();

  private selectedColorSubject = new BehaviorSubject<string>(''); // Valor predeterminado: ''
  selectedColor$ = this.selectedColorSubject.asObservable();

  private selectedFontSizeSubject = new BehaviorSubject<number>(0); // Valor predeterminado: 0
  selectedFontSize$ = this.selectedFontSizeSubject.asObservable();

  constructor() {
    // Cargar estilos guardados al iniciar
    this.loadUserStyles();
  }

  setSelectedBackgroundColor(color: string) {
    this.selectedBackgroundColorSubject.next(color);
    // Guardar el color de fondo seleccionado en localStorage
    localStorage.setItem('selectedBackgroundColor', color);
  }

  setSelectedColor(color: string) {
    this.selectedColorSubject.next(color);
    // Guardar el color de texto seleccionado en localStorage
    localStorage.setItem('selectedColor', color);
  }

  setSelectedFontSize(size: number) {
    this.selectedFontSizeSubject.next(size);
    // Guardar el tamaño de fuente seleccionado en localStorage
    localStorage.setItem('selectedFontSize', size.toString());
  }

  getSelectedBackgroundColor(): Observable<string> {
    return this.selectedBackgroundColor$;
  }

  private loadUserStyles() {
    // Cargar estilos guardados del usuario al iniciar
    const selectedBackgroundColor = localStorage.getItem('selectedBackgroundColor');
    if (selectedBackgroundColor) {
      this.setSelectedBackgroundColor(selectedBackgroundColor);
    }

    const selectedColor = localStorage.getItem('selectedColor');
    if (selectedColor) {
      this.setSelectedColor(selectedColor);
    }

    const selectedFontSize = localStorage.getItem('selectedFontSize');
    if (selectedFontSize) {
      this.setSelectedFontSize(parseInt(selectedFontSize, 10));
    }
  }
}

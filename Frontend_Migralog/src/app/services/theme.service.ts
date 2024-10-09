import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private selectedBackgroundColorSubject = new BehaviorSubject<string>('#98DECB'); // Default value
  selectedBackgroundColor$ = this.selectedBackgroundColorSubject.asObservable();

  // private selectedColorSubject = new BehaviorSubject<string>(''); 
  // selectedColor$ = this.selectedColorSubject.asObservable();

  // private selectedFontSizeSubject = new BehaviorSubject<number>(0); // Default value: 0
  // selectedFontSize$ = this.selectedFontSizeSubject.asObservable();

  constructor() {
    // Load saved styles on startup
    this.loadUserStyles();
  }

  setSelectedBackgroundColor(color: string) {
    this.selectedBackgroundColorSubject.next(color);
    // Save selected background color to localStorage
    localStorage.setItem('selectedBackgroundColor', color);
    // Apply the background color to the body
    document.body.style.backgroundColor = color;

  }

  // setSelectedColor(color: string) {
  //   this.selectedColorSubject.next(color);
  //   // Save selected text color to localStorage
  //   localStorage.setItem('selectedColor', color);
  // }

  // setSelectedFontSize(size: number) {
  //   this.selectedFontSizeSubject.next(size);
  //   // Save selected font size to localStorage
  //   localStorage.setItem('selectedFontSize', size.toString());
  // }

  getSelectedBackgroundColor(): Observable<string> {
    return this.selectedBackgroundColor$;
  }

  private loadUserStyles() {
    // Load user's saved styles on startup
    const selectedBackgroundColor = localStorage.getItem('selectedBackgroundColor');
    if (selectedBackgroundColor) {
      this.setSelectedBackgroundColor(selectedBackgroundColor);
    } else {
      // Optionally apply the default color to the body if none is found
      document.body.style.backgroundColor = '#98DECB'; // Default background color
    }
    // const selectedColor = localStorage.getItem('selectedColor');
    // if (selectedColor) {
    //   this.setSelectedColor(selectedColor);
    // }

    // const selectedFontSize = localStorage.getItem('selectedFontSize');
    // if (selectedFontSize) {
    //   this.setSelectedFontSize(parseInt(selectedFontSize, 10));
    // }
  }
}

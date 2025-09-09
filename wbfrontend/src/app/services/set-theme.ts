import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SetTheme {
  ifdarktheme: boolean = false;

  toggleTheme() {
    this.ifdarktheme = !this.ifdarktheme;
    if (this.ifdarktheme) {
      //document.body.classList.add('dark-theme');
      document.body.style.backgroundColor = '#121212';
      document.body.style.color = '#ffffff';

    } else {
      //document.body.classList.remove('dark-theme');
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#000000';
    }
  }

  isDarkTheme(): boolean {
    return this.ifdarktheme;
  }
}

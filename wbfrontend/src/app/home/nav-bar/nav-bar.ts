import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule} from '@angular/common';
import { SetTheme } from '../../services/set-theme';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './nav-bar.html',
  styleUrls: ['./nav-bar.css']
})
export class NavBar {
  islogged: boolean = false;
  isDark: boolean = false;
  theme : SetTheme;
  constructor(private chtheme : SetTheme){
    this.theme = chtheme;
  }

  ontogolet()
  {
    this.theme.toggleTheme();
    this.isDark = this.theme.isDarkTheme();
  }
}

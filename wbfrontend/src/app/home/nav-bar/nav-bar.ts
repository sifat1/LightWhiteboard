import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './nav-bar.html',
  styleUrls: ['./nav-bar.css']
})
export class NavBar {
  islogged: boolean = false;
}

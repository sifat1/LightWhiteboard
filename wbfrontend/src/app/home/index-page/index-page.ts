import { Component } from '@angular/core';
import { ListOfboards } from '../../whiteboard/list-ofboards/list-ofboards';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-index-page',
  imports: [ListOfboards,RouterModule,RouterLink],
  templateUrl: './index-page.html',
  styleUrl: './index-page.css'
})
export class IndexPage {

}

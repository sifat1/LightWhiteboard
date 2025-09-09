import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-ofboards',
  imports: [CommonModule, RouterLink,RouterModule],
  templateUrl: './list-ofboards.html',
  styleUrls: ['./list-ofboards.css']
})
export class ListOfboards {
  boards = [
    { id: 1, name: 'Project Alpha', createdAt: new Date('2024-01-15') },
    { id: 2, name: 'Marketing Plan', createdAt: new Date('2024-02-20') },
    { id: 3, name: 'Design Sprint', createdAt: new Date('2024-03-05') }
  ];

  createNewBoard() {
    this.boards.push({ id: this.boards.length + 1, name: `New Board ${this.boards.length + 1}`, createdAt: new Date() });
    console.log('New board created'); 
}

  openBoard(boardId: number) {
    console.log(`Opening board with ID: ${boardId}`);
    // Logic to navigate to the selected board can be added here
  } 
}

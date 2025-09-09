import { Component } from '@angular/core';
import { Getuserinfo } from '../services/getuserinfo';
import { UserDetails } from '../models/userDetails';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adminpanel',
  imports: [CommonModule],
  templateUrl: './adminpanel.html',
  styleUrl: './adminpanel.css'
})
export class Adminpanel {
  constructor(private userservice : Getuserinfo){}

  users : UserDetails[] = [];

  checked: number[] = [];

  ngOnInit()
  {
    this.users = this.userservice.getUsers();
  }

  onCheckboxChange(event: any) {
    const isChecked = event.target.checked;
    const userId = Number(event.target.id);
    if (isChecked) {
      if (!this.checked.includes(userId)) {
        this.checked.push(userId);
      }
    } else {
      const index = this.checked.indexOf(userId);
      if (index > -1) {
        this.checked.splice(index, 1);
      }
    }
    console.log(`Checkbox for user ID ${userId} is now ${isChecked ? 'checked' : 'unchecked'}`);
  }

  blockUsers() {
    this.users.forEach(user => {
      if(this.checked.includes(user.id)) {
        user.status = false;
      }
    });
    this.checked = [];
  }

  unblockUsers() {
    this.users.forEach(user => {
      if(this.checked.includes(user.id)) {
        user.status = true;
      }
    });
    this.checked = [];
  }

  deleteUsers() {
    this.users = this.users.filter(user => !this.checked.includes(user.id));
    this.checked = [];
  }
}

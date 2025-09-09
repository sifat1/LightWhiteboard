import { Injectable } from '@angular/core';
import { UserDetails } from '../models/userDetails';

@Injectable({
  providedIn: 'root'
})
export class Getuserinfo {
 getUsers(): UserDetails[] {
    return [
      new UserDetails(1, "sifat", "demo@email.com", true),
      new UserDetails(2, "john", "john@example.com", true),
      new UserDetails(3, "emily", "emily@example.com", false)
    ];
  }
}

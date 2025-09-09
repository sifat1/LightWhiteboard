import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServices {

  readonly baseUrl: string = 'http://localhost:3000/api/auth';

  constructor(private httpclient : HttpClient) { }  
  
  login(username: string, password: string) {
    // login logic here
    this.httpclient.post<{ token: string }>(`${this.baseUrl}/login`, {username: username, password: password}).subscribe(response => {
      console.log(response);
      localStorage.setItem('token', response.token);
    }, error => {
      console.error('Login failed', error);
    });
  }

  logout() {
    // logout logic here
  }

  isAuthenticated(): boolean {
    // check authentication status
    return false;
  }
}

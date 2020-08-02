import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });

  url = 'http://trinhvinhphuc.com:3000/user';

  getList() {
    return this.http.get(this.url, { headers: this.headers });
  }

  get(email) {
    const url = this.url + '/users/' + email;
    return this.http.get(url, { headers: this.headers });
  }

  create(value) {
    const body = JSON.stringify(value);
    return this.http.post(this.url, body, { headers: this.headers });
  }

  update(value) {
    const url = this.url + '/users/' + value.email;
    const body = JSON.stringify(value);
    return this.http.put(url, body, { headers: this.headers });
  }

  remove(email) {
    const url = this.url + '/users/' + email;
    return this.http.delete(url, { headers: this.headers });
  }

  changePassword(email, value) {
    const url = this.url + '/change-password/' + email;
    const body = JSON.stringify(value);
    return this.http.put(url, body, { headers: this.headers });
  }

  login(value) {
    const url = this.url + '/login';
    const body = JSON.stringify(value);
    return this.http.post(url, body, { headers: this.headers });
  }

  loginWithGG(value){
    const url = this.url + '/google';
    const body = JSON.stringify(value);
    return this.http.post(url, body, { headers: this.headers });
  }
}


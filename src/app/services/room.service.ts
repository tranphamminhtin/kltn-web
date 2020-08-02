import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });

  url = 'http://trinhvinhphuc.com:3000/room';

  getList() {
    return this.http.get(this.url, { headers: this.headers });
  }

  get(id) {
    const url = this.url + '/' + id;
    return this.http.get(url, { headers: this.headers });
  }

  create(name) {
    const body = JSON.stringify({ name });
    console.log(body);
    return this.http.post(this.url, body, { headers: this.headers });
  }

  update(value) {
    const url = this.url + '/' + value._id;
    const body = JSON.stringify(value);
    return this.http.put(url, body, { headers: this.headers });
  }

  remove(id) {
    const url = this.url + '/' + id;
    return this.http.delete(url, { headers: this.headers });
  }
}


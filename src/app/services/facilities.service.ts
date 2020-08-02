import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FacilitiesService {

  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });

  url = 'http://trinhvinhphuc.com:3000/facilities';

  getList() {
    return this.http.get(this.url, { headers: this.headers });
  }

  get(id) {
    const url = this.url + '/' + id;
    return this.http.get(url, { headers: this.headers });
  }

  create(value) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });
    const body = value;
    return this.http.post(this.url, body, { headers });
  }

  update(id, value) {
    const url = this.url + '/' + id;
    const body = JSON.stringify(value);
    return this.http.put(url, body, { headers: this.headers });
  }

  remove(id) {
    const url = this.url + '/' + id;
    return this.http.delete(url, { headers: this.headers });
  }
}

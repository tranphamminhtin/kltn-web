import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import domain from './domain';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });

  url = domain + '/vote';

  getList() {
    return this.http.get(this.url, { headers: this.headers });
  }

  getListByIdLoan(idLoan) {
    const url = this.url + '/findByIdLoan/' + idLoan;
    return this.http.get(url, { headers: this.headers });
  }

  get(id) {
    const url = this.url + '/' + id;
    return this.http.get(url, { headers: this.headers });
  }

  create(value) {
    const body = JSON.stringify(value);
    return this.http.post(this.url, body, { headers: this.headers });
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


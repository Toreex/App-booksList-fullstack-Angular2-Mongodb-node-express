import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class BookService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getBooks(): Observable<any> {
    return this.http.get('/api/books').map(res => res.json());
  }

  countBooks(): Observable<any> {
    return this.http.get('/api/books/count').map(res => res.json());
  }

  addBook(book): Observable<any> {
    return this.http.post('/api/book', JSON.stringify(book), this.options);
  }

  getBook(book): Observable<any> {
    return this.http.get(`/api/book/${book._id}`).map(res => res.json());
  }

  editBook(book): Observable<any> {
    return this.http.put(`/api/book/${book._id}`, JSON.stringify(book), this.options);
  }

  deleteBook(book): Observable<any> {
    return this.http.delete(`/api/book/${book._id}`, this.options);
  }

}

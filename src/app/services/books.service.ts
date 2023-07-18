import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { Book } from '../interfaces/book.interface';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  bookList: Book[] = []
  private apiUrl = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) { }

  getBooks(searchTerm: string): Observable<any> {
    const url = `${this.apiUrl}?q=${searchTerm}`;
    if (this.bookList.length > 0) {
      return of(this.bookList)
    }
    return this.http.get<any>(url).pipe(map((res: any) => {
      this.bookList = res.items;
      return res.items;
    }))
  }

  editBook(book: Book) {
    const bookIndex = this.bookList.findIndex(x => x.id === book.id);
    this.bookList[bookIndex] = book
    return of('success');
  }

  addBook(book: Book) {
    book.id = (this.bookList.length + 1).toString()
    this.bookList.push(book);
    return of('success');
  }

  getBookDetails(id: string): Observable<Book> {
    return of(this.bookList.find(item => item.id === id)!)
  }

  delete(id: string): Observable<Book[]> {
    const bookIndex = this.bookList.findIndex(x => x.id === id);
    return of(this.bookList.splice(bookIndex, 1))
  }

}

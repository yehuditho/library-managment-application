import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/interfaces/book.interface';
import { BooksService } from 'src/app/services/books.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  book: Book = {} as Book;
  editMode: boolean = false;
  constructor(
    private bookService: BooksService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    this.bookService.getBookDetails(bookId!).subscribe(res => {
      this.book = res;
    })
  }
  openToEdit() {
    this.editMode = true;
  }

  deleteBook() {
    this.bookService.delete(this.book.id).subscribe(res => {
      alert("Successfully deleted");
      this.router.navigate(['book-list']);
    })
  }
}
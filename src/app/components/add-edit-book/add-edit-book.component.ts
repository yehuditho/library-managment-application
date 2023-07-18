import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/interfaces/book.interface';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-add-edit-book',
  templateUrl: './add-edit-book.component.html',
  styleUrls: ['./add-edit-book.component.css']
})
export class AddEditBookComponent implements OnInit {
  bookForm: FormGroup = {} as FormGroup;
  @Input() book: Book = {} as Book;
  @Input() editMode: boolean = false
  constructor(private formBuilder: FormBuilder, private bookService: BooksService, private router: Router) { }

  ngOnInit() {
    this.bookForm = this.formBuilder.group({
      title: [this.book.volumeInfo?.title, Validators.required],
      subtitle: [this.book.volumeInfo?.subtitle],
      authors: [this.book.volumeInfo?.authors, Validators.required],
    });
  }

  saveBook() {
    var bookDetails = this.bookForm.value;
    var book: Book = {
      id: this.book.id,
      volumeInfo: {
        authors: bookDetails.authors,
        title: bookDetails.title,
        subtitle: bookDetails.subtitle,
        publishDate: bookDetails.publishDate
      }

    };
    if (!this.book.id) {
      this.bookService.addBook(book).subscribe(res => {
        alert('Successfully added');
        this.router.navigate(['book-list'])
      })
    }
    else {
      this.bookService.editBook(book).subscribe(res => {
        this.router.navigate(['book-list'])
        alert('Successfully edited');
      })
    }
  }
}

import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Book } from 'src/app/interfaces/book.interface';
import { BooksService } from 'src/app/services/books.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {
  bookListSub: Subscription = {} as Subscription;
  displayedColumns: string[] = ['id', 'title', 'subtitle', 'author'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  booksList: Book[] = [];
  filteredBooks: Book[] = [];
  filterText: string = '';
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private booksService: BooksService,
    private router: Router) {
  }

  ngOnInit() {
    var searchTerm = 'java';
    this.bookListSub = this.booksService.getBooks(searchTerm).subscribe(
      (res) => {
        this.booksList = res;
        this.dataSource = new MatTableDataSource(this.booksList);
        this.dataSource.sort = this.sort;
        this.applyFilter()
      },
      (error) => {
        console.error(error);
      }
    );
  }

  navigateToBookDetails(id: string) {
    this.router.navigate([`book/${id}`]);
  }

  applyFilter() {
    this.filteredBooks = this.booksList.filter((book: Book) =>
      book.volumeInfo.title.toLowerCase().includes(this.filterText.toLowerCase())
    );
    this.dataSource = new MatTableDataSource(this.filteredBooks)
  }

  addBook() {
    this.router.navigate(['add-book']);
  }

  ngOnDestroy(): void {
    this.bookListSub.unsubscribe();
  }
}

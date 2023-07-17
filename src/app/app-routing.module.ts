import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { AddEditBookComponent } from './components/add-edit-book/add-edit-book.component';

const routes: Routes = [
  { path: '', component: BookListComponent },
  { path: 'book-list', component: BookListComponent },
  { path: 'add-book', component: AddEditBookComponent },

  { path: 'book/:id', component: BookDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

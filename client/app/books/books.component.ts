import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { BookService } from '../services/book.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  book = {};
  books = [];
  isLoading = true;
  isEditing = false;

  addBookForm: FormGroup;
  title = new FormControl('', Validators.required);
  author = new FormControl('', Validators.required);
  price = new FormControl('', Validators.required);

  constructor(private bookService: BookService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getBooks();
    this.addBookForm = this.formBuilder.group({
      title: this.title,
      author: this.author,
      price: this.price
    });
  }

  getBooks() {
    this.bookService.getBooks().subscribe(
      data => this.books = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addBook() {
    this.bookService.addBook(this.addBookForm.value).subscribe(
      res => {
        const newBook = res.json();
        this.books.push(newBook);
        this.addBookForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(book) {
    this.isEditing = true;
    this.book = book;
  }

  cancelEditing() {
    this.isEditing = false;
    this.book = {};
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the books to reset the editing
    this.getBooks();
  }

  editBook(book) {
    this.bookService.editBook(book).subscribe(
      res => {
        this.isEditing = false;
        this.book = book;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteBook(book) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.bookService.deleteBook(book).subscribe(
        res => {
          const pos = this.books.map(elem => elem._id).indexOf(book._id);
          this.books.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}

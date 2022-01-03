import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HomeComponent } from './home.component';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { of } from 'rxjs';

const BOOKS: Book[] = [
  {
    name: '',
    author: '',
    isbn: '',
    price: 15000,
    amount: 2
  },
  {
    name: '',
    author: '',
    isbn: '',
    price: 20000,
    amount: 3
  }
];

describe('Home component', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let bookService: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientTestingModule],
      providers: [BookService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    bookService = fixture.debugElement.injector.get(BookService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getBook get books from the subscription', () => {
    const spyGetBooks = jest.spyOn(bookService, 'getBooks')
    .mockReturnValueOnce(of(BOOKS));

    component.getBooks();

    expect(spyGetBooks).toHaveBeenCalledTimes(1);
    expect(component.listBook.length).toBeGreaterThan(0);
  });
});
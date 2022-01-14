import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { BookService } from './book.service';
import { Book } from '../models/book.model';
import { environment } from '../../environments/environment';
import swal from 'sweetalert2';

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

describe('BookService', () => {
  let service: BookService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });

    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    jest.resetAllMocks();
    localStorage.clear();
  });

  afterAll(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('getBooks return a list of book and perform a get method', () => {
    service.getBooks().subscribe((response: Book[]) => {
      expect(response).toEqual(BOOKS);
    });

    const testRequest = httpMock.expectOne(environment.API_REST_URL + '/book');
    expect(testRequest.request.method).toBe('GET');
    testRequest.flush(BOOKS);
  });

  it('getBooksFromCart return a empty array when localstorage is empty', () => {
    const listBook = service.getBooksFromCart();

    expect(listBook.length).toBe(0);
  });

  it('getBooksFromCart return an array when it exists in the localstorage', () => {
    localStorage.setItem('listCartBook', JSON.stringify(BOOKS));

    const listBook = service.getBooksFromCart();

    expect(listBook.length).toBe(2);
  });

  it('addBookToCart add a book successfully when the list does not exist in the localStorage', () => {
    const book: Book =   {
      name: '',
      author: '',
      isbn: '',
      price: 15000,
    };

    const toastMock = { fire: () => null } as any;

    const toastSpy = jest.spyOn(swal, 'mixin').mockImplementation(() => {
      return toastMock;
    });

    let newListBook = service.getBooksFromCart();

    expect(newListBook.length).toBe(0);

    service.addBookToCart(book);
    newListBook = service.getBooksFromCart();

    expect(toastSpy).toBeCalledTimes(1);
    expect(newListBook.length).toBe(1);
  });

  it('removeBooksFromCart removes the list from the localStorage', () => {
    const book: Book = {
      name: '',
      author: '',
      isbn: '',
      price: 15000,
      amount: 2
    };

    const toastMock = { fire: () => null } as any;

    jest.spyOn(swal, 'mixin').mockImplementation(() => {
      return toastMock;
    });


    service.addBookToCart(book);
    let newListBook = service.getBooksFromCart();

    expect(newListBook.length).toBe(1);

    service.removeBooksFromCart();

    newListBook = service.getBooksFromCart();

    expect(newListBook.length).toBe(0);
  });
});
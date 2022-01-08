import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { BookService } from './book.service';
import { Book } from '../models/book.model';
import { environment } from '../../environments/environment';

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
});
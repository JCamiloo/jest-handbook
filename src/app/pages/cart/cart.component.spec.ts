import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from "./cart.component";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from '../../services/book.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Book } from '../../models/book.model';

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

describe('Cart component', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let bookService: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        CartComponent
      ],
      providers: [
        BookService
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    bookService = fixture.debugElement.injector.get(BookService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getTotalPrice returns a correct amount', () => {
    const totalPrice = component.getTotalPrice(BOOKS);

    expect(totalPrice).toBeDefined();
    expect(totalPrice).toBeGreaterThan(0);
  });

  it ('onInputNumberChange increments correctly', () => {
    const action = 'plus';
    const book: Book =   {
      name: '',
      author: '',
      isbn: '',
      price: 20000,
      amount: 3
    };
    
    const spyUpdateAmountBook = jest.spyOn(bookService, 'updateAmountBook')
    .mockImplementation(() => null);

    const spyGetTotalPrice = jest.spyOn(component, 'getTotalPrice')
    .mockImplementation(() => null);

    expect(book.amount).toBe(3);

    component.onInputNumberChange(action, book);

    expect(book.amount).toBe(4);
    expect(spyUpdateAmountBook).toHaveBeenCalledTimes(1);
    expect(spyGetTotalPrice).toHaveBeenCalledTimes(1);
  });

  it ('onInputNumberChange decrements correctly', () => {
    const action = 'minus';
    const book: Book =   {
      name: '',
      author: '',
      isbn: '',
      price: 20000,
      amount: 3
    };
    
    const spyUpdateAmountBook = jest.spyOn(bookService, 'updateAmountBook')
    .mockImplementation(() => null);

    const spyGetTotalPrice = jest.spyOn(component, 'getTotalPrice')
    .mockImplementation(() => null);

    expect(book.amount).toBe(3);

    component.onInputNumberChange(action, book);

    expect(book.amount).toBe(2);
    expect(spyUpdateAmountBook).toHaveBeenCalledTimes(1);
    expect(spyGetTotalPrice).toHaveBeenCalledTimes(1);
  });
});
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { By } from '@angular/platform-browser'

import { BookService } from '../../services/book.service';
import { CartComponent } from "./cart.component";
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

const MatDialogMock = {
  open: () => {
    return {
      afterClosed: () => of(true)
    }
  }
}

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
        BookService,
        { 
          provide: MatDialog,
          useValue: MatDialogMock
        }
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

  afterEach(() => {
    fixture.destroy();
    jest.resetAllMocks();
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

  it('onClearBooks works correctly', () => {
    component.listCartBook = BOOKS;
    const spyRemoveBooksFromCart = jest.spyOn(bookService, 'removeBooksFromCart')
    .mockImplementation(() => null);

    component.onClearBooks();

    expect(component.listCartBook.length).toBe(0);
    expect(spyRemoveBooksFromCart).toHaveBeenCalledTimes(1);
  });

  it('_clearListCartBook works correctly', () => {
    component.listCartBook = BOOKS;
    const spyRemoveBooksFromCart = jest.spyOn(bookService, 'removeBooksFromCart')
    .mockImplementation(() => null);

    component['_clearListCartBook']();

    expect(component.listCartBook.length).toBe(0);
    expect(spyRemoveBooksFromCart).toHaveBeenCalledTimes(1);
  });

  it('The title "the cart is empty" is not displayed when there is a list', () => {
    component.listCartBook = BOOKS;
    fixture.detectChanges();
    
    const debugElement: DebugElement = fixture.debugElement.query(By.css('#titleCartEmpty'));

    expect(debugElement).toBeFalsy();
  });

  it('The title "the cart is empty" is displayed correctly when the list is empty', () => {
    component.listCartBook = [];
    fixture.detectChanges();
    
    const debugElement: DebugElement = fixture.debugElement.query(By.css('#titleCartEmpty'));
    const element: HTMLElement = debugElement.nativeElement;

    expect(debugElement).toBeTruthy();
    expect(element.innerHTML).toContain('The cart is empty');
  });
});
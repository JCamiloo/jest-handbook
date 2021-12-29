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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getTotalPrice returns a correct amount', () => {
    const totalPrice = component.getTotalPrice(BOOKS);

    expect(totalPrice).toBeDefined();
    expect(totalPrice).toBeGreaterThan(0);
  });
});
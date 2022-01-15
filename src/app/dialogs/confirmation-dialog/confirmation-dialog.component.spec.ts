import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirmation-dialog.component';

const MatDialogMock = {
  close: () => null
}

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConfirmDialogComponent
      ],
      providers: [
        { 
          provide: MatDialogRef,
          useValue: MatDialogMock
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onConfirm send true value', () => {
    const service = TestBed.inject(MatDialogRef);
    const closeSpy = jest.spyOn(service, 'close');

    component.onConfirm();

    expect(closeSpy).toHaveBeenCalledWith(true);
  });

  it('onDismiss send false value', () => {
    const service = TestBed.inject(MatDialogRef);
    const closeSpy = jest.spyOn(service, 'close');

    component.onDismiss();

    expect(closeSpy).toHaveBeenCalledWith(false);
  });
});
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, provideRoutes } from '@angular/router';
import * as exp from 'constants';
import { CartService } from '../cart.service';
import { products } from '../products';

import { CartComponent } from './cart.component';

class FakeCartService {
  getItems() {
    return products;
  }
  clearCart() {
    return [];
  }
}

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let fakeCartService = new FakeCartService();
  let fakeFormBuilder = new FormBuilder();
  const testCheckout = fakeFormBuilder.group({
    name: 'bla',
    address: 'blabla',
    reset: jasmine.createSpy('reset')
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers: [{ provide: CartService, useValue: fakeCartService }, HttpClient, { provide: FormBuilder, useValue: testCheckout }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;

  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('should set items', () => {
    component.ngOnInit();
    expect(component.items).toEqual(products);
    // expect(component.items).toEqual(products.slice(0, 1));
  });


  it('should submit', () => {
    fixture.detectChanges();



    component.onSubmit();
    expect(component.items).toEqual([]);
    // expect(component.items).toEqual(products);

    expect(testCheckout.reset).toHaveBeenCalled();
  });
});

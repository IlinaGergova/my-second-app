import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as exp from 'constants';
import { Observable, of } from 'rxjs';
import { CartService } from '../cart.service';

import { ShippingComponent } from './shipping.component';

class FakeCartService {
  getShippingPrices(): Observable<{ type: string, price: number }[]> {
    const data = [{ type: 'a', price: 1 }, { type: 'b', price: 2 }];
    return of(data);
  }
}

describe('ShippingComponent', () => {
  let component: ShippingComponent;
  let fixture: ComponentFixture<ShippingComponent>;
  let fakeCartService = new FakeCartService();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShippingComponent],
      providers: [{ provide: CartService, useValue: fakeCartService }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get shipping costs', () => {
    component.ngOnInit();
    let currentRes: Object[] | undefined;
    let expectedRes: Object[] | undefined;

    component.shippingCosts.subscribe(a => currentRes = a);
    // of([{ type: 'a', price: 1 }]).subscribe(b => expectedRes = b);
    of([{ type: 'a', price: 1 }, { type: 'b', price: 2 }]).subscribe(b => expectedRes = b);
    // of([{ type: 'a', price: 1 }, { type: 'b', price: 3 }]).subscribe(b => expectedRes = b);
    expect(currentRes).toEqual(expectedRes);
  });
});

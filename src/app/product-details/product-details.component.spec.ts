import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import * as exp from 'constants';
import { CartService } from '../cart.service';
import { Product, products } from '../products';

import { ProductDetailsComponent } from './product-details.component';

class FakeCartService {
  items: Product[] = [];
  addToCart(product: Product) {
    this.items.push(product);
  }
}

fdescribe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let fakeCartService = new FakeCartService();
  const ID = 1; //pass
  // const ID = 99; //fail

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductDetailsComponent],
      providers: [{ provide: CartService, useValue: fakeCartService },
      {
        provide: ActivatedRoute, useValue: {
          snapshot:
          {
            paramMap:
            {
              get: (key: string) => key === 'productId' ? ID : undefined
            }
          }
        }
      }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the product', () => {
    component.ngOnInit();
    expect(products).toContain(component.product as Product);
  });

  it('should add new product', () => {
    const addToCartSpy = spyOn(fakeCartService, 'addToCart').and.callThrough();
    const newProduct = { id: 77, name: 'frog', price: 12, description: 'not for this shop' } as Product; //for pass
    // const product2 = { id: 12, name: 'wee', price: 12, description: 'not for this shop' } as Product; // for fail

    component.addToCart(newProduct);
    expect(fakeCartService.items).toContain(newProduct); //pass
    // expect(fakeCartService.items).toContain(product2); //fail

    expect(addToCartSpy).toHaveBeenCalledOnceWith(newProduct);

  });
});

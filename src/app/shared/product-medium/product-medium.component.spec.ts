import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMediumComponent } from './product-medium.component';

describe('ProductMediumComponent', () => {
  let component: ProductMediumComponent;
  let fixture: ComponentFixture<ProductMediumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductMediumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMediumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertaCarritoComponent } from './oferta-carrito.component';

describe('OfertaCarritoComponent', () => {
  let component: OfertaCarritoComponent;
  let fixture: ComponentFixture<OfertaCarritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfertaCarritoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertaCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

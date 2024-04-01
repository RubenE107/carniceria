import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReestablecerComponent } from './reestablecer.component';

describe('ReestablecerComponent', () => {
  let component: ReestablecerComponent;
  let fixture: ComponentFixture<ReestablecerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReestablecerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReestablecerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

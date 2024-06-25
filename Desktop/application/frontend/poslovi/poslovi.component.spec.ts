import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosloviComponent } from './poslovi.component';

describe('PosloviComponent', () => {
  let component: PosloviComponent;
  let fixture: ComponentFixture<PosloviComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PosloviComponent]
    });
    fixture = TestBed.createComponent(PosloviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

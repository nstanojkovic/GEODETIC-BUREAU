import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParceleComponent } from './parcele.component';

describe('ParceleComponent', () => {
  let component: ParceleComponent;
  let fixture: ComponentFixture<ParceleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParceleComponent]
    });
    fixture = TestBed.createComponent(ParceleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

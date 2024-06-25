import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlagajnaComponent } from './blagajna.component';

describe('BlagajnaComponent', () => {
  let component: BlagajnaComponent;
  let fixture: ComponentFixture<BlagajnaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlagajnaComponent]
    });
    fixture = TestBed.createComponent(BlagajnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

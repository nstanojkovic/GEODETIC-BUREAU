import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KatastarComponent } from './katastar.component';

describe('KatastarComponent', () => {
  let component: KatastarComponent;
  let fixture: ComponentFixture<KatastarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KatastarComponent]
    });
    fixture = TestBed.createComponent(KatastarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnableNewPagemodalComponent } from './enable-new-pagemodal.component';

describe('EnableNewPagemodalComponent', () => {
  let component: EnableNewPagemodalComponent;
  let fixture: ComponentFixture<EnableNewPagemodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnableNewPagemodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnableNewPagemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

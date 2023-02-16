import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSnippetComponent } from './list-snippet.component';

describe('ListSnippetComponent', () => {
  let component: ListSnippetComponent;
  let fixture: ComponentFixture<ListSnippetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSnippetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

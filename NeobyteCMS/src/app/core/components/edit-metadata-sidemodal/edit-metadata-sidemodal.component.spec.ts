import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMetadataSidemodalComponent } from './edit-metadata-sidemodal.component';

describe('EditMetadataSidemodalComponent', () => {
  let component: EditMetadataSidemodalComponent;
  let fixture: ComponentFixture<EditMetadataSidemodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMetadataSidemodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMetadataSidemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

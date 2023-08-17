import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvFormComponent } from './cv-form.component';

describe('CvFormComponent', () => {
  let component: CvFormComponent;
  let fixture: ComponentFixture<CvFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CvFormComponent]
    });
    fixture = TestBed.createComponent(CvFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

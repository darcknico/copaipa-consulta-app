import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatriculaModalComponent } from './matricula-modal.component';

describe('MatriculaModalComponent', () => {
  let component: MatriculaModalComponent;
  let fixture: ComponentFixture<MatriculaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatriculaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatriculaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

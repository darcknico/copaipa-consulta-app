import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportesTablaAporteComponent } from './importes-tabla-aporte.component';

describe('ImportesTablaAporteComponent', () => {
  let component: ImportesTablaAporteComponent;
  let fixture: ComponentFixture<ImportesTablaAporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportesTablaAporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportesTablaAporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleTablaAporteComponent } from './detalle-tabla-aporte.component';

describe('DetalleTablaAporteComponent', () => {
  let component: DetalleTablaAporteComponent;
  let fixture: ComponentFixture<DetalleTablaAporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleTablaAporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleTablaAporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

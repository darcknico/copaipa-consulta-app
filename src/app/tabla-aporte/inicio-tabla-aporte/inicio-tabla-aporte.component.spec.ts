import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioTablaAporteComponent } from './inicio-tabla-aporte.component';

describe('InicioTablaAporteComponent', () => {
  let component: InicioTablaAporteComponent;
  let fixture: ComponentFixture<InicioTablaAporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioTablaAporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioTablaAporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

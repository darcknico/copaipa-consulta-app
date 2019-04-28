import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoConvenioComponent } from './listado-convenio.component';

describe('ListadoConvenioComponent', () => {
  let component: ListadoConvenioComponent;
  let fixture: ComponentFixture<ListadoConvenioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoConvenioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoConvenioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

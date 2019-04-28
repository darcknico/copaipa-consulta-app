import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroConvenioComponent } from './filtro-convenio.component';

describe('FiltroConvenioComponent', () => {
  let component: FiltroConvenioComponent;
  let fixture: ComponentFixture<FiltroConvenioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroConvenioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroConvenioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

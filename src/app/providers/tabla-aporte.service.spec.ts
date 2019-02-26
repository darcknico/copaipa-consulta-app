import { TestBed } from '@angular/core/testing';

import { TablaAporteService } from './tabla-aporte.service';

describe('TablaAporteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TablaAporteService = TestBed.get(TablaAporteService);
    expect(service).toBeTruthy();
  });
});

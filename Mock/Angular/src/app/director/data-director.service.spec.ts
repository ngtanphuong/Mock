import { TestBed } from '@angular/core/testing';

import { DataDirectorService } from './data-director.service';

describe('DataDirectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataDirectorService = TestBed.get(DataDirectorService);
    expect(service).toBeTruthy();
  });
});

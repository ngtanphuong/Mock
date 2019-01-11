import { TestBed } from '@angular/core/testing';

import { SubDirectorService } from './sub-director.service';

describe('SubDirectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubDirectorService = TestBed.get(SubDirectorService);
    expect(service).toBeTruthy();
  });
});

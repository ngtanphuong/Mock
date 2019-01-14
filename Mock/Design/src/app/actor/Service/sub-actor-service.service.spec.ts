import { TestBed } from '@angular/core/testing';

import { SubActorServiceService } from './sub-actor-service.service';

describe('SubActorServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubActorServiceService = TestBed.get(SubActorServiceService);
    expect(service).toBeTruthy();
  });
});

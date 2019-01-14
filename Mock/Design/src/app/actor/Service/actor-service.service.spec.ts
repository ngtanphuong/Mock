import { TestBed } from '@angular/core/testing';

import { ActorServiceService } from './actor-service.service';

describe('ActorServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActorServiceService = TestBed.get(ActorServiceService);
    expect(service).toBeTruthy();
  });
});

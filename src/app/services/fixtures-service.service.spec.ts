import { TestBed } from '@angular/core/testing';

import { FixturesServiceService } from './fixtures-service.service';

describe('FixturesServiceService', () => {
  let service: FixturesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FixturesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

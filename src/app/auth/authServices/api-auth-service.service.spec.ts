import { TestBed } from '@angular/core/testing';

import { ApiAuthServiceService } from './api-auth-service.service';

describe('ApiAuthServiceService', () => {
  let service: ApiAuthServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiAuthServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

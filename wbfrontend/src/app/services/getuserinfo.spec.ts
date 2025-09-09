import { TestBed } from '@angular/core/testing';

import { Getuserinfo } from './getuserinfo';

describe('Getuserinfo', () => {
  let service: Getuserinfo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Getuserinfo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

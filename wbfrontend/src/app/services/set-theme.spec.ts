import { TestBed } from '@angular/core/testing';

import { SetTheme } from './set-theme';

describe('SetTheme', () => {
  let service: SetTheme;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetTheme);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ScrollStrategyService } from './scroll-strategy.service';

describe('ScrollStrategyService', () => {
  let service: ScrollStrategyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollStrategyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

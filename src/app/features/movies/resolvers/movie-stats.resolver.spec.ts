import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { movieStatsResolver } from './movie-stats.resolver';

describe('movieStatsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => movieStatsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});

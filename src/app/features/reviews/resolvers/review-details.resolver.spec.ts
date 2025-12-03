import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { reviewDetailsResolver } from './review-details.resolver';

describe('reviewDetailsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => reviewDetailsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});

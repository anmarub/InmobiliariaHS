import { TestBed } from '@angular/core/testing';

import { TypePropertyService } from './type-property.service';

describe('TypePropertyService', () => {
  let service: TypePropertyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypePropertyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

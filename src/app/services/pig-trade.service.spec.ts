import { TestBed } from '@angular/core/testing';

import { PigTradeService } from './pig-trade.service';

describe('PigTradeService', () => {
  let service: PigTradeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PigTradeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

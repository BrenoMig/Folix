import { TestBed } from '@angular/core/testing';

import { CarrinhoCompraService } from './carrinho-compra.service';

describe('CarrinhoCompraService', () => {
  let service: CarrinhoCompraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarrinhoCompraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

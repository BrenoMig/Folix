import { Injectable } from '@angular/core';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoCompraService {
  private carrinhoKey = 'carrinhoDeCompras';

  constructor() {}

  // Adiciona um produto ao carrinho
  adicionarProduto(produto: Produto): void {
    const carrinho = this.obterCarrinho();
    carrinho.push(produto);
    localStorage.setItem(this.carrinhoKey, JSON.stringify(carrinho));
  }

  // Remove um produto do carrinho
  removerProduto(idProduto: number): void {
    let carrinho = this.obterCarrinho();
    carrinho = carrinho.filter(item => item.idProduto !== idProduto);
    localStorage.setItem(this.carrinhoKey, JSON.stringify(carrinho));
  }

  // Obtém todos os produtos do carrinho
  obterCarrinho(): Produto[] {
    const carrinho = localStorage.getItem(this.carrinhoKey);
    return carrinho ? JSON.parse(carrinho) : [];
  }

  // Limpa o carrinho
  limparCarrinho(): void {
    localStorage.removeItem(this.carrinhoKey);
  }
}

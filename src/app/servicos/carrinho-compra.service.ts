import { Injectable } from '@angular/core';
import { Produto } from '../models/produto.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoCompraService {
  private carrinhoKey = 'carrinhoDeCompras';
  private apiUrl = 'http://localhost:7258/api/produtos/finalizar-compra'; // Atualize com a URL correta

  constructor(private http: HttpClient) {}

  // Adiciona um produto ao carrinho
  adicionarProduto(produto: Produto): void {
    const carrinho = this.obterCarrinho();

    // Verifica se o produto já existe no carrinho
    const produtoExistente = carrinho.find(item => item.idProduto === produto.idProduto);

    if (produtoExistente) {
      // Se o produto já estiver no carrinho, atualiza a quantidadeProduto
      produtoExistente.quantidadeProduto += produto.quantidadeProduto;
    } else {
      // Se o produto não existir, adiciona ao carrinho
      carrinho.push(produto);
    }

    // Atualiza o carrinho no localStorage
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

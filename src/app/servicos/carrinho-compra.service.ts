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
  adicionarProduto(produto: Produto): string {
    const carrinho = this.obterCarrinho();

    // Verifica se o produto já existe no carrinho
    const produtoExistente = carrinho.find(item => item.idProduto === produto.idProduto);

    if (produtoExistente) {
      // Verifica se a quantidade no carrinho + a que está sendo adicionada excede a quantidade em estoque
      const quantidadeTotal = produtoExistente.quantidadeProduto + produto.quantidadeProduto;
      if (quantidadeTotal > produto.quantidadeProduto) {
        return 'Não é possível adicionar mais do que a quantidade disponível no estoque.';
      } else {
        // Atualiza a quantidade no carrinho
        produtoExistente.quantidadeProduto += produto.quantidadeProduto;
      }
    } else {
      // Verifica se a quantidade solicitada não excede o estoque
      if (produto.quantidadeProduto > produto.quantidadeProduto) {
        return 'Não há estoque suficiente para adicionar este produto ao carrinho.';
      } else {
        // Se o produto não existir no carrinho, adiciona ao carrinho
        carrinho.push(produto);
      }
    }

    // Atualiza o carrinho no localStorage
    localStorage.setItem(this.carrinhoKey, JSON.stringify(carrinho));
    return 'Produto adicionado ao carrinho com sucesso.';
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

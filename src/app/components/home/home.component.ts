import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdutoService } from '../../servicos/produto.service';
import { CarrinhoCompraService } from '../../servicos/carrinho-compra.service';
import { Produto } from '../../models/produto.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  produtos: Produto[] = [];
  exibirSobreNos: boolean = false;
  quantidadeDesejada: { [key: number]: number } = {}; 
  carrinhoProdutos: Produto[] = []; 

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private carrinhoCompraService: CarrinhoCompraService
  ) {}

  ngOnInit(): void {
    this.buscarProdutos();
    this.carregarCarrinho(); 
  }

  buscarProdutos(): void {
    this.produtoService.getProdutos().subscribe(
      (produtos) => {
        this.produtos = produtos.map(produto => ({ ...produto, quantidadeDesejada: 1 })); 
      },
      (error) => {
        console.error('Erro ao buscar produtos:', error);
      }
    );
  }

  carregarCarrinho(): void {
    this.carrinhoProdutos = this.carrinhoCompraService.obterCarrinho();
  }

  alternarProdutoCarrinho(produto: Produto): void {
    const produtoNoCarrinho = this.carrinhoProdutos.find(item => item.idProduto === produto.idProduto);

    if (produtoNoCarrinho) {
      this.removerDoCarrinho(produto.idProduto); 
    } else {
      this.adicionarAoCarrinho(produto);
    }

    this.carregarCarrinho(); 
  }

  adicionarAoCarrinho(produto: Produto): void {
    const quantidade = this.quantidadeDesejada[produto.idProduto] || 1;

    if (quantidade > produto.quantidadeProduto) {
      alert(`Desculpe, só temos ${produto.quantidadeProduto} Kg de ${produto.nomeProduto} disponíveis.`);
      return;
    }

    this.carrinhoCompraService.adicionarProduto({ ...produto, quantidadeProduto: quantidade });
    alert(`${quantidade} Kg de ${produto.nomeProduto} adicionado(s) ao carrinho!`);
  }

  removerDoCarrinho(idProduto: number): void {
    this.carrinhoCompraService.removerProduto(idProduto);
    alert('Produto removido do carrinho!');
  }

  estaNoCarrinho(idProduto: number): boolean {
    return this.carrinhoProdutos.some(item => item.idProduto === idProduto);
  }

  verCarrinho(): void {
    this.router.navigate(['/carrinho']);
  }

  mostrarSobreNos(): void {
    this.exibirSobreNos = !this.exibirSobreNos;
  }

  decrementarQuantidade(produto: Produto): void {
    this.quantidadeDesejada[produto.idProduto] = Math.max(1, (this.quantidadeDesejada[produto.idProduto] || 1) - 1);
  }

  incrementarQuantidade(produto: Produto): void {
    this.quantidadeDesejada[produto.idProduto] = Math.min(produto.quantidadeProduto, (this.quantidadeDesejada[produto.idProduto] || 1) + 1);
  }

  // Navegação para a página de Informações Nutricionais
  irParaInformacoesNutricionais(): void {
    this.router.navigate(['/informacoes']);
  }
}

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
  quantidadeDesejada: { [key: number]: number } = {}; // Objeto para armazenar a quantidade desejada por id do produto

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private carrinhoCompraService: CarrinhoCompraService
  ) {}

  ngOnInit(): void {
    this.buscarProdutos();
  }

  buscarProdutos(): void {
    this.produtoService.getProdutos().subscribe(
      (produtos) => {
        console.log(produtos);
        this.produtos = produtos.map(produto => ({ ...produto, quantidadeDesejada: 1 })); // Adiciona a quantidade desejada como 1 por padrão
      },
      (error) => {
        console.error('Erro ao buscar produtos:', error);
      }
    );
  }

  adicionarAoCarrinho(produto: Produto): void {
    const quantidade = this.quantidadeDesejada[produto.idProduto] || 1; // Pega a quantidade desejada ou 1 se não estiver definida

    if (!quantidade || quantidade < 1) {
      alert('Por favor, insira uma quantidade válida.');
      return;
    }

    const estoqueDisponivel = produto.quantidadeProduto; // Assume que este campo representa o estoque
    if (quantidade > estoqueDisponivel) {
      alert(`Desculpe, só temos ${estoqueDisponivel} Kg de ${produto.nomeProduto} disponíveis em estoque.`);
      return;
    }

    this.carrinhoCompraService.adicionarProduto({ ...produto, quantidadeProduto: quantidade });
    alert(`${quantidade} Kg de ${produto.nomeProduto} adicionado(s) ao carrinho!`);
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
    const estoqueDisponivel = produto.quantidadeProduto;
    this.quantidadeDesejada[produto.idProduto] = Math.min(estoqueDisponivel, (this.quantidadeDesejada[produto.idProduto] || 1) + 1);
  }
}

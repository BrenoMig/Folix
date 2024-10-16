import { Component, OnInit } from '@angular/core';
import { Produto } from '../../models/produto.model';
import { CarrinhoCompraService } from '../../servicos/carrinho-compra.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Importe o Router

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class CarrinhoComponent implements OnInit {
  produtosCarrinho: Produto[] = [];
  total: number = 0;

  constructor(private carrinhoService: CarrinhoCompraService, private router: Router) {} // Injete o Router

  ngOnInit(): void {
    this.carregarCarrinho();
    this.calcularTotal();
  }

  carregarCarrinho(): void {
    this.produtosCarrinho = this.carrinhoService.obterCarrinho();
    this.calcularTotal();
  }

  removerProduto(produto: Produto): void {
    this.carrinhoService.removerProduto(produto.idProduto);
    this.carregarCarrinho();
  }

  finalizarCompra(): void {
    if (this.produtosCarrinho.length > 0) {
      this.carrinhoService.limparCarrinho();
      this.produtosCarrinho = [];
      this.total = 0;
      this.router.navigate(['/compra']); 
    } else {
      alert('Seu carrinho está vazio.');
    }
  }

  calcularTotal(): void {
    this.total = this.produtosCarrinho.reduce((sum, produto) => sum + produto.valorKg, 0);
  }
}

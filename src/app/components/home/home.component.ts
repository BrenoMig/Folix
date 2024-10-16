import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdutoService } from '../../servicos/produto.service';
import { CarrinhoCompraService } from '../../servicos/carrinho-compra.service'; // Importar o serviço
import { Produto } from '../../models/produto.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  produtos: Produto[] = [];
  exibirSobreNos: boolean = false; // Propriedade para controlar a exibição do texto "Sobre nós"

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private carrinhoCompraService: CarrinhoCompraService // Injetar o serviço
  ) {}

  ngOnInit(): void {
    this.buscarProdutos();
  }

  buscarProdutos(): void {
    this.produtoService.getProdutos().subscribe(
      (produtos) => {
        console.log(produtos); // Verifique os dados aqui
        this.produtos = produtos;
      },
      (error) => {
        console.error('Erro ao buscar produtos:', error);
      }
    );
  }

  adicionarAoCarrinho(produto: Produto): void { 
    this.carrinhoCompraService.adicionarProduto(produto);
    alert('Produto adicionado ao carrinho!');
  }

  voltar(): void {
    this.router.navigate(['/home']);
  }

  verCarrinho(): void {
    this.router.navigate(['/carrinho']);
  }

  mostrarSobreNos(): void { // Método para alternar a exibição do texto "Sobre nós"
    this.exibirSobreNos = !this.exibirSobreNos; // Alterna a exibição
  }
}

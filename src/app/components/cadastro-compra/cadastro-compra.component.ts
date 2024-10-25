import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { Produto } from '../../models/produto.model'; 
import { CarrinhoCompraService } from '../../servicos/carrinho-compra.service';
import { ProdutoService } from '../../servicos/produto.service';

@Component({
  selector: 'app-cadastro-compra',
  templateUrl: './cadastro-compra.component.html',
  styleUrls: ['./cadastro-compra.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CadastroCompraComponent {
  estados: { sigla: string; nome: string; }[] = [
    { sigla: 'SP', nome: 'São Paulo' },
    { sigla: 'RJ', nome: 'Rio de Janeiro' },
    { sigla: 'MG', nome: 'Minas Gerais' },

  ];

  cidadesPorEstado: { [sigla: string]: string[] } = {
    'SP': ['São Paulo', 'Campinas', 'Santos'],
    'RJ': ['Rio de Janeiro', 'Niterói', 'Petrópolis'],
    'MG': ['Belo Horizonte', 'Uberlândia', 'Contagem'],

  };

  cidades: string[] = [];
  selectedEstado: string = '';
  selectedCidade: string = '';
  rua: string = '';
  numero: string = '';
  cep: string = '';
  nomeCartao: string = '';
  numeroCartao: string = '';
  validade: string = '';
  cvv: string = '';
  private apiUrl = 'https://localhost:7258/api/produto'; 

  constructor(private router: Router, private http: HttpClient, private carrinhoService : CarrinhoCompraService, private produtoService : ProdutoService) {
    this.carregarDados();
  }

  carregarDados() {
    const dadosCompra = JSON.parse(localStorage.getItem('dadosCompra') || '{}');
    this.selectedEstado = dadosCompra.selectedEstado ?? '';
    this.rua = dadosCompra.rua ?? '';
    this.numero = dadosCompra.numero ?? '';
    this.cep = dadosCompra.cep ?? '';
    this.nomeCartao = dadosCompra.nomeCartao ?? '';
    this.numeroCartao = dadosCompra.numeroCartao ?? '';
    this.validade = dadosCompra.validade ?? '';
    this.cvv = dadosCompra.cvv ?? '';

    if (this.selectedEstado) {
      this.atualizarCidades();
      this.selectedCidade = dadosCompra.selectedCidade ?? '';
    }

    this.verificarFormulario();
  }

  atualizarCidades() {
    this.cidades = this.cidadesPorEstado[this.selectedEstado] || [];
    this.selectedCidade = '';
  }

  salvarDados() {
    const dadosCompra = {
      selectedEstado: this.selectedEstado,
      selectedCidade: this.selectedCidade,
      rua: this.rua,
      numero: this.numero,
      cep: this.cep,
      nomeCartao: this.nomeCartao,
      numeroCartao: this.numeroCartao,
      validade: this.validade,
      cvv: this.cvv
    };
    localStorage.setItem('dadosCompra', JSON.stringify(dadosCompra));
  }

  concluirCompra() {
    if (this.formularioValido()) {
      this.salvarDados();
      this.finalizarCompra(); 
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  }

  async finalizarCompra() {
    const produtosCarrinho = this.carrinhoService.obterCarrinho();
    console.log(produtosCarrinho);
    this.produtoService.finalizarCompra(produtosCarrinho).subscribe(
      (produtos) => {
        alert('Compra concluída com sucesso!');
        this.carrinhoService.limparCarrinho();
        this.router.navigate(['/home']);
       
      },
      (error) => {
        alert(error.error);
        console.error('Erro ao buscar produtos:', error);
      }
    );

  }

  formularioValido(): boolean {
    return Boolean(
      this.selectedEstado && this.selectedCidade && this.rua &&
      this.numero && this.cep && this.nomeCartao &&
      this.numeroCartao && this.validade && this.cvv
    );
  }

  voltar() {  
    this.router.navigate(['/carrinho']); 
  }
  

  verificarFormulario() {
    if (!this.formularioValido()) {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  }
}

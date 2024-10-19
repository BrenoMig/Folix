import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Importe o HttpClient
import { Produto } from '../../models/produto.model'; // Importe seu modelo Produto

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
    // Adicione outros estados conforme necessário
  ];

  cidadesPorEstado: { [sigla: string]: string[] } = {
    'SP': ['São Paulo', 'Campinas', 'Santos'],
    'RJ': ['Rio de Janeiro', 'Niterói', 'Petrópolis'],
    'MG': ['Belo Horizonte', 'Uberlândia', 'Contagem'],
    // Adicione outras cidades conforme necessário
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
  private apiUrl = 'https://localhost:7258/api/produto'; // URL base da sua API para produtos

  constructor(private router: Router, private http: HttpClient) {
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
      this.finalizarCompra(); // Chame a função para finalizar a compra
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  }

  finalizarCompra() {
    // Obtenha os produtos do carrinho do localStorage
    const produtosCarrinho = JSON.parse(localStorage.getItem('produtosCarrinho') || '[]');

    // Atualiza a quantidade de cada produto no banco de dados
    const atualizacoes = produtosCarrinho.map((produto: Produto) => {
      const produtoAtualizado = {
        idProduto: produto.idProduto,
        nomeProduto: produto.nomeProduto,
        valorKg: produto.valorKg,
        produtoImagem: produto.produtoImagem,
        quantidadeProduto: produto.quantidadeProduto - produto.quantidadeProduto // Subtrai a quantidade comprada do estoque
      };
      return this.http.put(`${this.apiUrl}/${produto.idProduto}`, produtoAtualizado); // Usando a URL da API
    });

    // Execute todas as requisições de atualização
    Promise.all(atualizacoes)
      .then(() => {
        alert('Compra concluída com sucesso!');
        localStorage.removeItem('produtosCarrinho'); // Limpa o carrinho após a compra
        this.router.navigate(['/home']);
      })
      .catch(error => {
        alert('Erro ao finalizar a compra. Tente novamente.');
        console.error(error);
      });
  }

  formularioValido(): boolean {
    return Boolean(
      this.selectedEstado && this.selectedCidade && this.rua &&
      this.numero && this.cep && this.nomeCartao &&
      this.numeroCartao && this.validade && this.cvv
    );
  }

  verificarFormulario() {
    if (!this.formularioValido()) {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  }
}

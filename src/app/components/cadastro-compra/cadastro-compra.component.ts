import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-compra',
  templateUrl: './cadastro-compra.component.html',
  styleUrls: ['./cadastro-compra.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CadastroCompraComponent {
  // Lista de estados e suas siglas
  estados: { sigla: string; nome: string; }[] = [
    { sigla: 'SP', nome: 'São Paulo' },
    { sigla: 'RJ', nome: 'Rio de Janeiro' },
    { sigla: 'MG', nome: 'Minas Gerais' },
    // Adicione outros estados conforme necessário
  ];

  // Mapeamento de cidades por estado
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

  constructor(private router: Router) {
    this.carregarDados();
  }

  carregarDados() {
    // Carregar dados do localStorage
    const dadosCompra = JSON.parse(localStorage.getItem('dadosCompra') || '{}');
    this.selectedEstado = dadosCompra.selectedEstado ?? '';
    this.rua = dadosCompra.rua ?? '';
    this.numero = dadosCompra.numero ?? '';
    this.cep = dadosCompra.cep ?? '';
    this.nomeCartao = dadosCompra.nomeCartao ?? '';
    this.numeroCartao = dadosCompra.numeroCartao ?? '';
    this.validade = dadosCompra.validade ?? '';
    this.cvv = dadosCompra.cvv ?? '';

    // Atualizar lista de cidades conforme o estado
    if (this.selectedEstado) {
      this.atualizarCidades();
      this.selectedCidade = dadosCompra.selectedCidade ?? ''; // Definir a cidade selecionada
    }

    // Verificar se o formulário está válido após carregar os dados
    this.verificarFormulario();
  }

  atualizarCidades() {
    this.cidades = this.cidadesPorEstado[this.selectedEstado] || [];
    this.selectedCidade = '';  // Limpar a cidade ao atualizar o estado
  }

  salvarDados() {
    // Salvar dados no localStorage
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
      alert('Compra concluída com sucesso!');
      this.router.navigate(['/home']);
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  }

  formularioValido(): boolean {
    return Boolean(
      this.selectedEstado && this.selectedCidade && this.rua &&
      this.numero && this.cep && this.nomeCartao &&
      this.numeroCartao && this.validade && this.cvv
    );
  }

  verificarFormulario() {
    // Verifica se o formulário está válido após o carregamento dos dados
    if (!this.formularioValido()) {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  }
}

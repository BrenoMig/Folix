import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../servicos/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class CadastroComponent {
  usuario: Usuario = {
    nomeCompleto: '',
    idade: null,
    email: '',
    telefone: '',
    cpf: '',
    senha: ''
  };

  constructor(private usuarioService: UsuarioService, private router: Router) {} 

  // Atualiza o CPF sem formatação
  onCPFInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.usuario.cpf = input.value.replace(/\D/g, ''); 
  }

  onSubmit() {
    console.log(this.usuario); 
    this.usuarioService.cadastrar(this.usuario).subscribe(
      (response: Usuario) => {
        alert('Cadastro realizado com sucesso!');
        this.router.navigate(['/home']); 
      },
      (error: any) => {
        alert('Erro ao cadastrar: ' + error.message);
      }
    );
  }

  
  navigateToLogin() {
    this.router.navigate(['/login']); 
  }
}

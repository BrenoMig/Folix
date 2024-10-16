import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../servicos/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule], // Adicione isso
})
export class CadastroComponent {
  usuario: Usuario = {
    idUsuario: 0,
    nomeCompleto: '',
    idade: 0,
    email: '',
    telefone: 0,
    cpf: 0,
    senha: ''
  };

  constructor(private usuarioService: UsuarioService) {}

  onSubmit() {
    this.usuarioService.cadastrar(this.usuario).subscribe(
      (response: Usuario) => {
        alert('Cadastro realizado com sucesso!');
        // Navegar para a tela de login, se necessário
        // Por exemplo, redirecionar para a página de login
        // this.router.navigate(['/login']);
      },
      (error: any) => {
        alert('Erro ao cadastrar: ' + error.message);
      }
    );
  }
}

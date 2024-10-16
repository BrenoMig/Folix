import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../servicos/usuario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login: string = '';
  senha: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  onLogin() {
    this.usuarioService.autenticar(this.login, this.senha).subscribe(
      (response) => {
        alert('Login realizado com sucesso!');
        this.router.navigate(['/home']); // Redireciona para a página inicial
      },
      (error) => {
        alert('Erro ao realizar login: ' + error.message);
      }
    );
  }

  goToCadastro() {
    this.router.navigate(['/cadastro']);
  }
}

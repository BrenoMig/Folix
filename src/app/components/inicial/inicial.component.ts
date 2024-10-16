import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.component.html',
  styleUrls: ['./inicial.component.css']
})
export class InicialComponent {
  constructor(private router: Router) {}

  irParaLogin() {
    this.router.navigate(['/login']); // Redireciona para a página de login
  }
}

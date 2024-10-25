import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informacoes-nutricionais',
  standalone: true,
  imports: [],
  templateUrl: './informacoes-nutricionais.component.html',
  styleUrls: ['./informacoes-nutricionais.component.css'] 
})
export class InformacoesNutricionaisComponent {

  constructor(private router: Router) {}

  voltar() {
    this.router.navigate(['home']); 
  }
}

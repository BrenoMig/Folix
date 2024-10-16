import { Routes } from '@angular/router';
import { InicialComponent } from './components/inicial/inicial.component'; 
import { HomeComponent } from './components/home/home.component'; 
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { LoginComponent } from './components/login/login.component';
import { CadastroCompraComponent } from './components/cadastro-compra/cadastro-compra.component';

export const routes: Routes = [
  { path: '', component: InicialComponent }, 
  { path: 'home', component: HomeComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'carrinho', component: CarrinhoComponent },
  { path: 'compra', component: CadastroCompraComponent },
  { path: '**', redirectTo: '' } 
];
